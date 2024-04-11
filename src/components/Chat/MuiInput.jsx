import { Button, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { lightBlue, blueGrey } from '@mui/material/colors';
import MoodIcon from '@mui/icons-material/Mood';

export const MuiTextField = styled(TextField)(({ theme }) => ({
  borderBottomColor: 'transparent !important',
  border: 'none !important',
  color: 'white !important',

  '& .MuiFilledInput-root': {
    borderBottomColor: 'transparent !important',
    border: 'none !important',
  },
  '.MuiInputBase-root': {
    color: 'white !important',
    font: 200,
    borderBottomColor: 'transparent !important',
    border: 'none !important',
  },
  '.MuiInputBase-root:before': {
    color: 'white !important',
    font: 200,
    // background: 'red !important',
    borderBottomColor: 'transparent !important',

    border: 'none !important',
  },
  '.MuiInputBase-input': {
    color: 'white !important',
    background: '#333 !important',
    borderColor: 'transparent !important',
    borderBottomColor: 'transparent !important',
    border: 'none !important',
  },
  '.MuiInputBase-input::placeholder': {
    borderBottomColor: 'transparent !important',
    border: 'none !important',

    color: 'grey', // Change placeholder color here
  },

  //   '& label': {
  //     color: blueGrey[400],
  //   },
  '& label.Mui-focused': {
    color: 'white',
  },

  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent !important',
    border: 'none !important',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderBottomColor: 'transparent !important',
      border: 'none !important',
    },
    '&:hover fieldset': {},
    fieldset: {
      borderBottomColor: 'transparent !important',
      border: 'none !important',
    },
    '&.Mui-focused fieldset': {
      borderBottomColor: 'transparent !important',
      border: 'none !important',

      //   color: `${theme.palette.primary.main}`,
    },
  },
}));

export const GreyMoodIcon = styled(MoodIcon)({
  color: blueGrey[400], // Change icon color to grey
});
