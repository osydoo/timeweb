import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import PlusImg from '../components/img/thumbnail.png'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3),
    },
    appbar: {
      flexGrow: 1,
      backgroundColor: '#ffeb3b'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    lettertitle: {
        marginTop: 12,
        padding: 6
    }
  }));

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

export default function WriteMail() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const letter = useSelector(state => state.rootReducer.letter, []);
    const openpage = useSelector(state => state.rootReducer.openpage, []);
    const [files, setFiles] = React.useState([]);

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      }, [files]);

      const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
          setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file),
          })));
          dispatch({ type: 'ADD_LETTER', letter:{ ...letter, img: acceptedFiles }})
        },
      });
    
      const thumbs = files.map((file) => (
        <div key={file.name}>
          <div>
            <img
              src={file.preview}
              alt=""
              heigth="100%"
              width="100%"
            />
          </div>
        </div>
      ));

    const handleWriting = e => {
        dispatch({ type: 'ADD_LETTER', letter:{ ...letter, [e.target.id]: e.target.value }})
    }

    return (
        <div hidden={!(openpage.letter)}> 
            <Paper className={classes.paper}>
                <Grid container className={classes.lettertitle}>
                    <Typography variant="h4">
                        편지 쓰기
                    </Typography>
                    <CreateIcon />
                </Grid>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h5" className={classes.lettertitle}>
                            제목
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                        id="title"
                        placeholder="미래의 나에게!"
                        fullWidth
                        margin="normal"
                        onChange={handleWriting}
                        />
                    </Grid>
                </Grid>
                <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            files[0] !== undefined
                            ? (
                                <aside style={thumbsContainer}>
                                    {thumbs}
                                </aside>
                            ) :
                            <img 
                            src={PlusImg}
                            alt="사진을 끌어다 놓으시거나 클릭하시오"
                            heigth="100%"
                            width="100%"
                            />
                        }
                </div>
                <TextField
                id="body"
                placeholder="나는 과연 미래에 무엇을 하고 있을가??"
                margin="normal"
                fullWidth
                variant="outlined"
                multiline
                rows="20"
                rowsMax="20"
                onChange={handleWriting}
                />
                <Button variant="contained" fullWidth className={classes.appbar}>
                    편지 보내기
                </Button>
            </Paper>
        </div>
    );
}
