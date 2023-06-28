import { Container } from "@mui/system";
import ModelAnswerSegmenter from "../components/ModelAnswerSegmenter/ModelAnswerSegmenter";
import {
  Button,
  ButtonGroup,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  TextField,
  Typography
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { Question } from "../entities/Question";
import { ModelAnswerSegment } from "../entities/ModelAnswerTypes";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Exam } from "../entities/Exam";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import When from "../components/When";
import { AppBarContext } from "../store/AppBarContext";

const EditExam = (props: { id: string }) => {


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogIndex, setDeleteDialogIndex] = useState<number>(-1);
  const [exam, setExam] = useState<Exam>({
    id: '',
    mode: 'editing',
    questions: [] as Question[],
    name: ''
  });
  const [editNameMode, setEditNameMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const questions = useMemo(() => exam.questions, [exam]);
  const setQuestions = useCallback((questions: Question[]) => {
    setExam({ ...exam, questions });
  }, [exam]);

  const examName = useMemo(() => exam.name, [exam]);
  const setExamName = useCallback((name: string) => {
    setExam({ ...exam, name });
  }, [exam]);



  const { setAppBarTitle } = useContext(AppBarContext);

  useEffect(() => {
    setAppBarTitle('');
  }, []);

  useEffect(() => {

    const fetchExam = async () => {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setExam({
        id: props.id,
        name: 'English Exam',
        mode: 'editing',
        questions: [
          {
            title: "tst1",
            modelAnswer: {
              body: "testttttt herereere 1jiuo3242"
            }
          },
          {
            title: "tst2",
            modelAnswer: {
              body: "testttttt herereere 1jiuo3242"
            }
          },
          {
            title: "tst3",
            modelAnswer: {
              body: "testttttt herereere 1jiuo3242"
            }
          }
        ]
      });
    };
    setLoading(true);

    fetchExam().then(() => (setLoading(false)));
  }, []);

  const setSegments = (index: number) => (segements: ModelAnswerSegment[]) => {
    const newQuestions = [...questions];
    newQuestions[index].modelAnswer.segements = segements;
    setQuestions(newQuestions);
  };

  const setModelAnswer = (index: number) => (modelAnswer: string) => {
    const newQuestions = [...questions];
    newQuestions[index].modelAnswer.body = modelAnswer;
    setQuestions(newQuestions);
  };

  const setMode = (index: number) => (mode: 'grade' | 'edit') => {
    const newQuestions = [...questions];
    newQuestions[index].modelAnswer.mode = mode;
    setQuestions(newQuestions);
  };

  const handleTitleOnChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    newQuestions[index].title = e.target.value;
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index: number) => () => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleOpenDeleteDialog = (index: number) => () => {
    setDeleteDialogIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleAddQuestion = (index: number) => () => {
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, {
      title: '',
      modelAnswer: {
        body: ''
      }
    });
    setQuestions(newQuestions);
  };

  const handleMoveUpQuestion = (index: number) => () => {
    if (index > 0) {
      const newQuestions = [...questions];
      [newQuestions[index - 1], newQuestions[index]] = [newQuestions[index], newQuestions[index - 1]];
      setQuestions(newQuestions);
    }
  };

  const handleMoveDownQuestion = (index: number) => () => {
    if (index + 1 < questions.length) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
      setQuestions(newQuestions);
    }
  };

  const enableEditingNameMode = () => {
    setEditNameMode(true);
  };

  const disableEditingNameMode = () => {
    setEditNameMode(false);
  };

  const handleEditingExamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamName(e.target.value);
  };

  return (
    <div className='bg-gray-200/5'>
      <Container className='p-4 mt-4'>
        <When isTrue={loading}>
          <LinearProgress />
        </When>
        <When isTrue={!loading}>
          <div className='flex flex-col gap-8'>
            <div className='flex'>
              <Card className='p-4 w-full'>
                {editNameMode ?
                  <div className='flex'>
                    <TextField id='standard-basic' value={examName}
                      onChange={handleEditingExamName} variant='standard' />
                    <IconButton className='mx-1' size='large' onClick={disableEditingNameMode}>
                      <CheckIcon />
                    </IconButton>
                  </div> :
                  <div className='flex flex-wrap items-center'>
                    <Typography className='h-fit' variant='h5' >{examName}</Typography>
                    <div className='mx-1'>
                      <IconButton size='small' onClick={enableEditingNameMode}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  </div>}
              </Card>
              <ButtonGroup className='my-3 mx-1' orientation='vertical'>
                <IconButton onClick={handleAddQuestion(-1)} size='large'>
                  <AddCircleIcon />
                </IconButton>
              </ButtonGroup>
            </div>
            {questions.map((question, index) => (
              <div key={index} className='flex'>
                <Card className='p-6 w-full'>
                  <div className='flex flex-wrap'>
                    <Typography className='h-fit' variant='h5' >Question {index + 1}</Typography>
                  </div>
                  <TextField
                    id='standard-basic'
                    key={index}
                    label='Question title'
                    variant='outlined'
                    multiline
                    rows='3'
                    margin='normal'
                    value={question.title}
                    onChange={handleTitleOnChange(index)}
                    sx={{ backgroundColor: '#FFFFFF', width: '100%', borderRadius: 2 }}
                  />
                  <div className='my-8'>
                    <ModelAnswerSegmenter rows={8}
                      modelAnswer={question.modelAnswer.body} setModelAnswer={setModelAnswer(index)}
                      segments={question.modelAnswer.segements} setSegments={setSegments(index)}
                      mode={question.modelAnswer.mode} setMode={setMode(index)} />
                  </div>
                </Card>
                <ButtonGroup className='my-8 mx-1' orientation='vertical'>
                  <IconButton onClick={handleAddQuestion(index)} size='large'>
                    <AddCircleIcon />
                  </IconButton>
                  <IconButton onClick={handleOpenDeleteDialog(index)} aria-label='delete' size='large'>
                    <DeleteIcon fontSize='inherit' />
                  </IconButton>
                  {index > 0 &&
                  <IconButton onClick={handleMoveUpQuestion(index)} size='large'>
                    <KeyboardArrowUpIcon />
                  </IconButton>}
                  {index + 1 < questions.length &&
                  <IconButton onClick={handleMoveDownQuestion(index)} size='large'>
                    <KeyboardArrowDownIcon />
                  </IconButton>}
                </ButtonGroup>
              </div>
            ))}
            <div className='flex justify-end px-14 pb-12'>
              <Button className='w-32' color='primary' variant='contained'>Save</Button>
            </div>
          </div>
        </When>
      </Container>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Delete Question {deleteDialogIndex + 1}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant='body1'
            >
              This question will be deleted permanently from the exam.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteDialogClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteQuestion(deleteDialogIndex)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditExam;
