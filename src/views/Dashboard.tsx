import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import { AppBarContext } from "../store/AppBarContext";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';
import When from "../components/When";
import { ExamModel } from "../entities/Exam";
import StudentsAnswers from "./StudentsAnswers";
import EditExam from "./EditExam";
import axiosInstance from "../services/AxiosService";
import { ExamCardSerializer, ExamModeDeserializer } from "../serializers/ExamSerializer";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const { setAppBarTitle, setAppBarButtons } = useContext(AppBarContext);
  const [mode, setMode] = useState<'idle' | 'editing' | 'results'>('idle');
  const [examId, setExamId] = useState(-1);
  const [exams, setExams] = useState<ExamModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sharingDialogOpen, setSharingDialogOpen] = useState(false);
  const [sharingDialogExam, setSharingDialogExam] = useState<ExamModel | null>(null);
  const [stopSharingDialogOpen, setStopSharingDialogOpen] = useState(false);
  const [stopSharingDialogExam, setStopSharingDialogExam] = useState<ExamModel | null>(null);

  useEffect(() => {
    setAppBarTitle(`Welcome ${user?.firstName ?? ''} ${user?.lastName ?? ''}!`);
    setAppBarButtons([
      <Button
        key={0}
        color='inherit'
        startIcon={<HomeIcon />}
        onClick={() => {
          setExamId(-1);
          setMode('idle');
        }}
      >
        Home
      </Button>,
      <Button
        key={1}
        color='inherit'
        startIcon={<LogoutIcon />}
        sx={{
          marginLeft: '2rem'
        }}
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </Button>
    ]);
  }, [user]);

  const fetchExams = useCallback(async () => {
    setLoading(true);

    const exams: ExamModel[] = (
      await axiosInstance.get('/exam/card/')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ).data.map((exam: any) => ExamCardSerializer(exam));

    setExams(exams);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (examId !== -1) {
      setAnchorEl(document.getElementById(`exam-card-${examId}`));
    }
  }, [examId, exams]);

  const [fetchInterval, setFetchInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchExams();
    setFetchInterval(setInterval(fetchExams, 10000));

    return () => {
      if (fetchInterval) {
        clearInterval(fetchInterval);
      }
    };
  }, [fetchExams, user]);

  const handleOpenExam = (exam: ExamModel) => async () => {
    if (exam.mode === 'answering' || exam.mode === 'grading') {
      handleStopSharing(exam);
      return;
    }

    setExamId(exam.id);
    setMode(exam.mode);
  };

  const handleDeleteExam = (exam: ExamModel) => async () => {
    setLoading(true);
    await axiosInstance.delete(`/exam/${exam.id}`);
    fetchExams();

    setExamId(-1);
    setAnchorEl(null);
  };

  const handleShareToStudents = (exam: ExamModel) => () => {
    if (exam.mode === 'editing') {
      setSharingDialogOpen(true);
      setSharingDialogExam(exam);
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/student-exam/${exam.id}`);
    }
    setExamId(-1);
    setAnchorEl(null);
  };

  const handleSharingDialogClose = () => {
    setSharingDialogOpen(false);
    setSharingDialogExam(null);
  };

  const handleSharingAccept = async (exam: ExamModel) => {
    await axiosInstance.patch(`/exam/card/${exam.id}/`, {
      mode: ExamModeDeserializer('answering')
    });

    handleSharingDialogClose();
    fetchExams();
  };

  const handleStopSharing = (exam: ExamModel) => {
    setStopSharingDialogOpen(true);
    setStopSharingDialogExam(exam);
    setExamId(-1);
    setAnchorEl(null);
  };

  const handleStopSharingDialogClose = () => {
    setStopSharingDialogOpen(false);
    setStopSharingDialogExam(null);
  };

  const handleStopSharingAccept = async (exam: ExamModel) => {
    await axiosInstance.patch(`/grade/${exam.id}/`);

    handleStopSharingDialogClose();
    fetchExams();
  };

  const primaryActionTextFromMode = (mode: ExamModel['mode']) => {
    switch (mode) {
    case 'editing':
      return 'Edit';
    case 'results':
      return 'View Results';
    case 'answering':
      return 'Stop sharing';
    }
  };

  return (<>
    <When isTrue={mode === 'idle'}>
      <div className='flex h-full'>
        <Drawer
          variant='permanent'
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '.MuiListItemIcon-root': {
                color: 'primary.contrastText'
              },
              '.Mui-selected': {
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }
            }
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setExamId(-1);
                    setMode('editing');
                  }}
                >
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>
                  <ListItemText primary='New Exam' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected>
                  <ListItemIcon>
                    <FolderOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary='Open Exam' />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <div className='bg-gray-200/10 h-full flex-grow'>
          <Container>
            <LinearProgress sx={{ visibility: `${loading ? "visible" : "hidden"}` }}/>
            <Box
              className='flex flex-row flex-wrap gap-5 w-full h-full pt-10'
            >
              {exams.map((exam) => (
                <>
                  <Card
                    key={exam.id}
                  >
                    <CardActionArea
                      id={`exam-card-${exam.id}`}
                      aria-controls={`exam-menu-${exam.id}`}
                      onClick={() => {
                        setExamId(exam.id);
                      }}
                      disabled={exam.mode === 'grading'}
                      sx={exam.mode === 'grading' ? {
                        backgroundColor: 'grey.300'
                      } : undefined}
                    >
                      <CardContent
                        className='w-64 h-64 flex flex-col gap-5'
                      >
                        <Typography variant='h5'>{exam.name}</Typography>
                        <Typography
                          variant='body1'
                          className='flex-grow'
                        >
                          {exam.description}
                        </Typography>
                        <Typography variant='body2' className='text-gray-500'>
                          {exam.mode.charAt(0).toUpperCase() + exam.mode.slice(1)} Mode
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Menu
                    key={exam.id + '-menu'}
                    id={`exam-menu-${exam.id}`}
                    aria-labelledby={`exam-card-${exam.id}`}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left'
                    }}
                    anchorEl={anchorEl}
                    open={exam.id === examId}
                    onClose={() => setExamId(-1)}
                  >
                    <MenuItem
                      onClick={handleOpenExam(exam)}
                    >
                      <ListItemIcon>
                        <FileOpenIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={primaryActionTextFromMode(exam.mode)}
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={handleDeleteExam(exam)}
                      disabled={exam.mode === 'answering'}
                    >
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary='Delete' />
                    </MenuItem>
                    <MenuItem
                      onClick={handleShareToStudents(exam)}
                      disabled={exam.mode === 'results'}
                    >
                      <ListItemIcon>
                        <ShareIcon />
                      </ListItemIcon>
                      <ListItemText primary={exam.mode !== 'editing' ? 'Copy URL' : 'Start sharing to students'} />
                    </MenuItem>
                  </Menu>
                </>
              ))}
            </Box>
          </Container>
        </div>
        <Dialog
          open={sharingDialogOpen}
          onClose={handleSharingDialogClose}
        >
          <DialogTitle>Share to students</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography
                variant='body1'
              >
              You are about to make this exam sharable to students, this will make the exam unmodifiable.
              Are you sure you want to continue?
              </Typography>
              <Typography
                variant='body2'
                className='text-gray-500'
              >
              Note: You can copy exam URL via the dashboard.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSharingDialogClose}
            >
            Cancel
            </Button>
            <Button
              onClick={() => sharingDialogExam && handleSharingAccept(sharingDialogExam)}
            >
            Accept
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog
        open={stopSharingDialogOpen}
        onClose={handleStopSharingDialogClose}
      >
        <DialogTitle>Stop sharing to students</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant='body1'
            >
              You are about to stop sharing this exam to students, no students will be able to answer this exam anymore.
              Are you sure you want to continue?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleStopSharingDialogClose}
          >
            Cancel
          </Button>
          <Button
            onClick={() => stopSharingDialogExam && handleStopSharingAccept(stopSharingDialogExam)}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </When>
    <When isTrue={mode === 'editing'}>
      <EditExam
        id={examId}
        onClose={() => {
          setExamId(-1);
          setMode('idle');
          fetchExams();
        }}
      />
    </When>
    <When isTrue={mode === 'results'}>
      <StudentsAnswers
        id={examId}
      />
    </When>
  </>);
};

export default Dashboard;
