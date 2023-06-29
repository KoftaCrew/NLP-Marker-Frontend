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

  useEffect(() => {
    setAppBarTitle(`Welcome ${user?.firstName ?? ''} ${user?.lastName ?? ''}!`);
    setAppBarButtons([
      <Button
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
      await axiosInstance.get('/exam/')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ).data.map((exam: any) => ({
      id: exam.id,
      name: exam.name,
      description: exam.description,
      mode: exam.mode === 0 ? 'editing' : 'results'
    }));

    setExams(exams);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const handleOpenExam = (exam: ExamModel) => () => {
    setExamId(exam.id);
    setMode(exam.mode);
  };

  const handleDeleteExam = (exam: ExamModel) => () => {
    // TODO: Delete exam
    exam;

    setExamId(-1);
    setAnchorEl(null);
  };

  const handleShareToStudents = (exam: ExamModel) => () => {
    if (exam.mode === 'editing') {
      setSharingDialogOpen(true);
      setSharingDialogExam(exam);
    } else {
      // TODO: Copy exam URL
      navigator.clipboard.writeText(`${window.location.origin}/student-exam?id=${exam.id}`);
    }
    setExamId(-1);
    setAnchorEl(null);
  };

  const handleSharingDialogClose = () => {
    setSharingDialogOpen(false);
    setSharingDialogExam(null);
  };

  const handleSharingAccept = (exam: ExamModel) => {
    // TODO: Share exam
    exam;

    handleSharingDialogClose();
  };

  return (<>
    <When isTrue={mode === 'idle'}>
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
      <div className='bg-gray-200/10 h-full'>
        <Container>
          <When isTrue={loading}>
            <LinearProgress />
          </When>
          <When isTrue={!loading}>
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
                        setAnchorEl(document.getElementById(`exam-card-${exam.id}`));
                      }}
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
                          {exam.mode === 'editing' ? 'Editing' : 'Results'} Mode
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
                        primary={exam.mode === 'editing' ? 'Edit' : 'View Results'}
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={handleDeleteExam(exam)}
                    >
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary='Delete' />
                    </MenuItem>
                    <MenuItem
                      onClick={handleShareToStudents(exam)}
                    >
                      <ListItemIcon>
                        <ShareIcon />
                      </ListItemIcon>
                      <ListItemText primary={exam.mode === 'editing' ? 'Start sharing to students' : 'Copy URL'} />
                    </MenuItem>
                  </Menu>
                </>
              ))}
            </Box>
          </When>
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
