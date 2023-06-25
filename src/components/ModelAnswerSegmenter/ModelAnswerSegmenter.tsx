import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModelAnswerSegment } from "../../entities/ModelAnswerTypes";
import { segmentModelAnswer } from "../../services/ModelAnswerService";
import { LoadingButton } from "@mui/lab/";
import { deepCopy } from "../../utils/Utils";
import { CustomInputProps, ModelAnswerSegmenterProps } from "./ModelAnswerSegmenterTypes";
import {
  HIGHLIGHT_COLORS,
  PRELIMINARY_SEGMENTATION_MESSAGE,
  NOT_ALL_TEXT_SEGMENTED,
  RESEGMENTATION_MESSAGE,
  NEED_NEW_SEGMENTATION
} from "./ModelAnswerSegmenterConstants";

const CustomInput = ({ value, rows, segments: segmentsState, setSegments }: CustomInputProps) => {
  const [draggingIndex, setDraggingIndex] = useState<{ segmentId: number, place: "start" | "end" }>(
    { segmentId: -1, place: "start" }
  );

  const [hoveringWord, setHoveringWord] = useState<{ start: number, end: number }>({ start: -1, end: -1 });
  const segments = useMemo(() => deepCopy(segmentsState), [segmentsState]);

  const validateSegments = useCallback((input: ModelAnswerSegment[]): boolean => {
    const sortedSegments = deepCopy(input).sort((a, b) => a.start - b.start);
    for (let i = 0; i < sortedSegments.length - 1; i++) {
      if (sortedSegments[i].end > sortedSegments[i + 1].start) {
        return false;
      }
    }
    return true;
  }, []);

  const handleStartDragging = (segmentId: number, place: "start" | "end") => () => {
    if (segmentId === -1 || segments === undefined || setSegments === undefined) {
      return;
    }
    setDraggingIndex({
      segmentId,
      place
    });
  };

  const handleEndDragging = () => {
    setDraggingIndex({ segmentId: -1, place: "start" });
  };

  const handleHoverWord = (start: number, end: number) => () => {
    if (value.substring(start, end).trim() !== '') {
      setHoveringWord({ start, end });
    }
  };

  const handleHoverWordEnd = () => {
    setHoveringWord({ start: -1, end: -1 });
  };

  const handleNewSegment = (start: number, end: number) => () => {
    if (segments === undefined || setSegments === undefined) {
      return;
    }
    const newSegments = deepCopy(segments);
    newSegments.push({ start, end });
    if (validateSegments(newSegments)) {
      setSegments(newSegments.sort((a, b) => a.start - b.start));
    }
  };

  useEffect(() => {
    if (!segments || !setSegments) {
      return;
    }
    if (
      draggingIndex.segmentId === -1
      || draggingIndex.segmentId < 0
      || draggingIndex.segmentId >= segments.length
    ) {
      return;
    }
    if (hoveringWord.start === -1 || hoveringWord.end === -1) {
      return;
    }

    const newSegments = deepCopy(segments);
    if (draggingIndex.place === "start") {
      newSegments[draggingIndex.segmentId].start = hoveringWord.start;
    } else {
      newSegments[draggingIndex.segmentId].end = hoveringWord.end;
    }
    if (newSegments[draggingIndex.segmentId].start >= newSegments[draggingIndex.segmentId].end) {
      // Remove segment
      newSegments.splice(draggingIndex.segmentId, 1);
      setDraggingIndex({ segmentId: -1, place: "start" });
    }
    if (validateSegments(newSegments)) {
      newSegments.sort((a, b) => a.start - b.start);
      setSegments(newSegments);
    }
  }, [draggingIndex, hoveringWord]);

  const [gradeDialogOpen, setGradeDialogOpen] = useState(-1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddGrade = (segmentId: number) => () => {
    if (segments === undefined || setSegments === undefined) {
      return;
    }
    setGradeDialogOpen(segmentId);
    setDialogOpen(true);
    setDialogGrade("");
  };

  const handleGradeDialogClose = (grade: number) => () => {
    if (segments === undefined || setSegments === undefined) {
      return;
    }
    if (grade !== -1) {
      const newSegments = deepCopy(segments);
      newSegments[gradeDialogOpen].grade = grade;
      setSegments(newSegments);
    }
    setDialogOpen(false);
  };

  const [dialogGrade, setDialogGrade] = useState("");

  const segmentedText = useMemo(() => {
    if (segments === undefined || setSegments === undefined) {
      return value;
    }
    if (!validateSegments(segments)) {
      return <span className='text-red-500'>Invalid segmentation</span>;
    }
    const sortedSegments = deepCopy(segments).sort((a, b) => a.start - b.start);
    const text: {
      segmentId: number,
      text: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color: any | null,
      start: number,
      end: number,
      grade?: number
    }[] = [];
    let lastEnd = 0;

    for (let i = 0; i < sortedSegments.length; i++) {
      const segment = sortedSegments[i];
      text.push({
        text: value.substring(lastEnd, segment.start),
        color: null,
        segmentId: -1,
        start: lastEnd,
        end: segment.start
      });
      text.push({
        text: value.substring(segment.start, segment.end),
        color: HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length],
        segmentId: i,
        start: segment.start,
        end: segment.end,
        grade: segment.grade
      });
      lastEnd = segment.end;
    }
    text.push({
      text: value.substring(lastEnd),
      color: null,
      segmentId: -1,
      start: lastEnd,
      end: value.length
    });

    return text.map((segment, i) => (segment.text === '' ? null :
      <Tooltip
        key={i}
        title={segment.segmentId === -1 || draggingIndex.segmentId !== -1 ? null :
          <div className='text-lg'>
            <span className='font-bold'>Marks: </span>
            <span>{segment.grade ?? 'N/A'}</span>
            <p className='text-sm'>Double click to change assigned marks</p>
          </div>
        }
        followCursor
      >
        <span
          key={i}
          onDoubleClick={segment.segmentId === -1 ? undefined : handleAddGrade(segment.segmentId)}
        >
          <span
            className='inline-block w-1 cursor-col-resize hover:border-r-4'
            style={{
              backgroundColor: segment.color === null ? 'transparent' : segment.color[200],
              borderColor: segment.color === null ? 'transparent' : segment.color[500]
            }}
            onMouseDown={handleStartDragging(segment.segmentId, "start")}
          >
            &nbsp;
          </span>
          {
            segment.text.split(/(\s)/).map((word, j, arr) => {
              let start = segment.start;
              for (let k = 0; k < j; k++) {
                start += arr[k].length;
              }
              return (
                <>
                  <span
                    key={i * 1000 + j}
                    style={{
                      backgroundColor: segment.color === null ? 'transparent' : segment.color[segment.grade ? 100 : 50]
                    }}
                    className={word === '\n' ? 'block' : 'inline-block'}
                    onMouseOver={handleHoverWord(start, start + word.length)}
                    onMouseOut={handleHoverWordEnd}
                    onDoubleClick={handleNewSegment(start, start + word.length)}
                  >
                    {word !== '\n' && word}
                  </span>
                </>
              );
            }
            )
          }
          <span
            className='inline-block w-1 cursor-col-resize hover:border-l-4'
            style={{
              backgroundColor: segment.color === null ? 'transparent' : segment.color[200],
              borderColor: segment.color === null ? 'transparent' : segment.color[500]
            }}
            onMouseDown={handleStartDragging(segment.segmentId, "end")}
          >
            &nbsp;
          </span>
        </span>
      </Tooltip>
    ));
  }, [value, segments, setSegments, validateSegments, draggingIndex]);

  return (
    <>
      <div
        style={{ height: `${rows * 1.5}em` }}
        className={
          'whitespace-pre-wrap overflow-y-auto w-full select-none '
          + `${draggingIndex.segmentId !== -1 ? 'cursor-col-resize' : ''}`
        }
        onMouseUp={handleEndDragging}
      >
        {segmentedText}
      </div>
      <Dialog
        open={gradeDialogOpen !== -1 && dialogOpen}
        onClose={handleGradeDialogClose(-1)}
      >
        <DialogTitle>Set Marks</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Set assigned marks for this segment.</p>
            {segments && gradeDialogOpen !== -1 &&
              <p className='font-bold'>
                {value.substring(segments[gradeDialogOpen].start, segments[gradeDialogOpen].end)}
              </p>
            }
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='grade'
            label='Marks'
            type='number'
            fullWidth
            value={dialogGrade}
            onChange={(e) => setDialogGrade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleGradeDialogClose(-1)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGradeDialogClose(parseInt(dialogGrade))}
          >
            Set Marks
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


const ModelAnswerSegmenter = (props: ModelAnswerSegmenterProps) => {
  const [mode, setMode] = useState<'grade' | 'edit'>('edit');
  const [modelAnswer, setModelAnswer] =
    props.modelAnswer === undefined
      || props.setModelAnswer === undefined
      ? useState<string>(props.modelAnswer ?? '')
      : [props.modelAnswer, props.setModelAnswer];

  const [segments, setSegments] =
    props.segments === undefined
      || props.setSegments === undefined
      ? useState<ModelAnswerSegment[]>(props.segments ?? [])
      : [props.segments, props.setSegments];

  const [loading, setLoading] = useState(false);
  const [needSegmentation, setNeedSegmentation] = useState(false);

  const allTextSegmented = useMemo(() => {
    if (segments.length === 0) {
      return false;
    }
    // Get text that is not segmented
    const sortedSegments = deepCopy(segments).sort((a, b) => a.start - b.start);
    let unsegmentedText = "";
    for (let i = 0; i < sortedSegments.length - 1; i++) {
      unsegmentedText += modelAnswer.substring(sortedSegments[i].end, sortedSegments[i + 1].start);
    }
    return unsegmentedText.trim() === '';
  }, [segments, modelAnswer]);
  const helperText = useMemo(() => {
    if (mode === 'edit' && segments.length === 0) {
      return PRELIMINARY_SEGMENTATION_MESSAGE;
    }
    if (mode === 'grade' && !allTextSegmented && !loading) {
      return NOT_ALL_TEXT_SEGMENTED;
    }
    if (mode === 'grade' && segments.length > 0 && !needSegmentation) {
      return RESEGMENTATION_MESSAGE;
    }
    if (mode === 'grade' && segments.length > 0 && needSegmentation) {
      return NEED_NEW_SEGMENTATION;
    }
    return '';
  }, [mode, segments, needSegmentation, allTextSegmented, loading]);

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
