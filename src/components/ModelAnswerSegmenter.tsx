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

const CustomInput = ({ value, rows, segments, setSegments }: CustomInputProps) => {
  const [dragging, setDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(-1);

  const [hovering, setHovering] =
   useState<{ segmentId: number, place: "start" | "end" }>({ segmentId: -1, place: "start" });

  const validateSegments = (segments: ModelAnswerSegment[]): boolean => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text: { segmentId: number, text: string, color: any | null }[] = [];
    let lastEnd = 0;

    for (let i = 0; i < sortedSegments.length; i++) {
      const segment = sortedSegments[i];
      text.push({
        text: value.substring(lastEnd, segment.start),
        color: null,
        segmentId: i
      });
      text.push({
        text: value.substring(segment.start, segment.end),
        color: HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length],
        segmentId: i
      });
      lastEnd = segment.end;
    }
    text.push({
      text: value.substring(lastEnd),
      color: null,
      segmentId: sortedSegments.length
    });

    const handleHover = (segmentId: number, place: "start" | "end") => () => {
      setHovering({ segmentId, place });
    };

    const handleHoverEnd = () => {
      setHovering({ segmentId: -1, place: "start" });
    };

    return text.map((segment, i) => (segment.text === '' ? null :
      <>
        <span
          className='inline-block w-1 cursor-col-resize hover:border-r-4'
          style={{
            backgroundColor: segment.color === null ? 'transparent' : segment.color[200],
            borderColor: segment.color === null ? 'transparent' : segment.color[500]
          }}
          onMouseOver={handleHover(segment.segmentId, "start")}
          onMouseOut={handleHoverEnd}
        >
          &nbsp;
        </span>
        {
          segment.text.split('').map((char, j) => (
            <span
              key={i * 1000 + j}
              style={{ backgroundColor: segment.color[100] }}
              className='inline-block'
            >
              {char}
            </span>
          )
          )
        }
        <span
          className='inline-block w-1 cursor-col-resize hover:border-l-4'
          style={{
            backgroundColor: segment.color === null ? 'transparent' : segment.color[200],
            borderColor: segment.color === null ? 'transparent' : segment.color[500]
          }}
          onMouseOver={handleHover(segment.segmentId, "end")}
          onMouseOut={handleHoverEnd}
        >
          &nbsp;
        </span>
      </>
    ));
  }, [value, segments]);

  return (
    <div
      style={{ height: `${rows * 1.5}em` }}
      className='whitespace-pre-wrap overflow-y-auto w-full select-none'
    >
      {segmentedText}
    </div>
  );
};

interface ModelAnswerSegmenterProps {
  modelAnswer?: string;
  setModelAnswer?: (modelAnswer: string) => void;
  setSegments?: (segments: ModelAnswerSegment[]) => void;
  rows?: number;
}

const HIGHLIGHT_COLORS = [
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
];

/* eslint-disable max-len */
const PRELIMINARY_SEGMENTATION_MESSAGE = 'This model answer is not yet segmented. We will suggest a segmentation for you.';
const RESEGMENTATION_MESSAGE = 'This model answer has been segmented. You can edit the segmentation by clicking on segments.';
const NEED_NEW_SEGMENTATION = 'You have edited the model answer. If you want us to suggest a new segmentation, click "Smart segmentation" below.';
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
  const [needSegmentation, setNeedSegmentation] = useState(false);

  const helperText = useMemo(() => {
    if (mode === 'edit' && segments.length === 0) {
      return PRELIMINARY_SEGMENTATION_MESSAGE;
    }
    if (mode === 'grade' && segments.length > 0 && !needSegmentation) {
      return RESEGMENTATION_MESSAGE;
    }
    if (mode === 'grade' && segments.length > 0 && needSegmentation) {
      return NEED_NEW_SEGMENTATION;
    }
    return '';
  }, [mode, segments, needSegmentation]);
  const rows = props.rows ?? 10;

  const getNewSegments = async () => {
    setLoading(true);
    const newSegments = await segmentModelAnswer(modelAnswer);
    setSegments(newSegments);
    setLoading(false);
    setNeedSegmentation(false);
  };

  const handleSwitchMode = () => {
    setMode(mode === 'edit' ? 'grade' : 'edit');

    if (mode === 'edit' && segments.length === 0) {
      getNewSegments();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelAnswer(e.target.value);
    setNeedSegmentation(true);
  };

  return (<div className='w-full flex flex-col gap-5'>
    <TextField
      variant='outlined'
      label='Model answer'
      fullWidth
      multiline
      value={modelAnswer}
      rows={rows}
      disabled={loading}
      onChange={handleOnChange}
      InputProps={{
        inputComponent: mode === 'grade' && !loading ? CustomInput : 'textarea'
      }}
      inputProps={{
        segments,
        setSegments
      }}
      helperText={helperText}
    />
    <div className='flex flex-col items-end gap-2'>
      <LoadingButton
        loading={loading}
        variant='contained'
        className='flex-grow-0'
        onClick={handleSwitchMode}
      >
        Switch to {mode === 'edit' ? 'grade' : 'edit'} mode
      </LoadingButton>
      <LoadingButton
        loading={loading}
        variant='contained'
        className='flex-grow-0'
        onClick={getNewSegments}
        disabled={mode === 'edit'}
      >
        Smart segmentation
      </LoadingButton>
    </div>
  </div>);
};

export default ModelAnswerSegmenter;
