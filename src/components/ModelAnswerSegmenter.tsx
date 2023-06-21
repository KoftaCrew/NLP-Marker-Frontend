import { InputBaseComponentProps, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { ModelAnswerSegment } from "../entities/ModelAnswerTypes";
import { segmentModelAnswer } from "../services/ModelAnswerService";
import { LoadingButton } from "@mui/lab";
import {
  amber,
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow
} from '@mui/material/colors';

interface CustomInputProps extends InputBaseComponentProps {
  segments?: ModelAnswerSegment[];
  setSegments?: (segments: ModelAnswerSegment[]) => void;
}

const CustomInput = ({value, segments, setSegments}: CustomInputProps) => {
  const validateSegments = (segments: ModelAnswerSegment[]) : boolean => {
    const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
    for (let i = 0; i < sortedSegments.length - 1; i++) {
      if (sortedSegments[i].end > sortedSegments[i + 1].start) {
        return false;
      }
    }
    return true;
  };

  const segmentedText = useMemo(() => {
    if (segments === undefined || setSegments === undefined) {
      return value;
    }
    if (!validateSegments(segments)) {
      return <span className='text-red-500'>Invalid segmentation</span>;
    }
    const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
    const text: {text: string, color: string}[] = [];
    let lastEnd = 0;

    for (let i = 0; i < sortedSegments.length; i++) {
      const segment = sortedSegments[i];
      text.push({
        text: value.substring(lastEnd, segment.start),
        color: 'white'
      });
      text.push({
        text: value.substring(segment.start, segment.end),
        color: HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length]
      });
      lastEnd = segment.end;
    }

    return text.map((segment, i) => (
      <span
        key={i}
        style={{backgroundColor: segment.color}}
        className='inline-block'
      >
        {segment.text}
      </span>
    ));
  }, [value, segments]);

  return (
    <div
      style={{height:'7.5em'}}
      className='whitespace-pre-wrap overflow-y-auto w-full'
    >
      {segmentedText}
    </div>
  );
};

interface ModelAnswerSegmenterProps {
  modelAnswer?: string;
  setModelAnswer?: (modelAnswer: string) => void;
  setSegments?: (segments: ModelAnswerSegment[]) => void;
}

const HIGHLIGHT_COLORS = [
  amber[100],
  blue[100],
  cyan[100],
  deepOrange[100],
  deepPurple[100],
  green[100],
  indigo[100],
  lightBlue[100],
  lightGreen[100],
  lime[100],
  orange[100],
  pink[100],
  purple[100],
  red[100],
  teal[100],
  yellow[100]
];

/* eslint-disable max-len */
const PRELIMINARY_SEGMENTATION_MESSAGE = 'This model answer is not yet segmented. We will suggest a segmentation for you.';
/* eslint-enable max-len */

const ModelAnswerSegmenter = (props: ModelAnswerSegmenterProps) => {
  const [mode, setMode] = useState<'grade' | 'edit'>('edit');
  const [modelAnswer, setModelAnswer] =
    props.modelAnswer === undefined
  || props.setModelAnswer === undefined
      ? useState<string>(props.modelAnswer ?? '')
      : [props.modelAnswer, props.setModelAnswer];

  const [segments, setSegments] = useState<ModelAnswerSegment[]>([]);
  const [loading, setLoading] = useState(false);

  const helperText = useMemo(() => {
    if (mode === 'edit' && segments.length === 0) {
      return PRELIMINARY_SEGMENTATION_MESSAGE;
    }
    return '';
  }, [mode]);

  const handleSwitchMode = async () => {
    setMode(mode === 'edit' ? 'grade' : 'edit');

    if (mode === 'edit' && segments.length === 0) {
      setLoading(true);
      const newSegments = await segmentModelAnswer(modelAnswer);
      setSegments(newSegments);
      setLoading(false);
    }
  };

  return (<div className='w-full flex flex-col'>
    <TextField
      variant='outlined'
      label='Model answer'
      fullWidth
      multiline
      value={modelAnswer}
      rows={5}
      disabled={loading}
      onChange={(e) => setModelAnswer(e.target.value)}
      margin='dense'
      InputProps={{
        inputComponent: mode === 'grade' && !loading ? CustomInput : 'textarea'
      }}
      inputProps={{
        segments,
        setSegments
      }}
      helperText={helperText}
    />
    <div className='flex flex-col items-end'>
      <LoadingButton
        loading={loading}
        variant='contained'
        className='flex-grow-0'
        onClick={ handleSwitchMode }
      >
        Switch to { mode === 'edit' ? 'grade' : 'edit' } mode
      </LoadingButton>
    </div>
  </div> );
};

export default ModelAnswerSegmenter;
