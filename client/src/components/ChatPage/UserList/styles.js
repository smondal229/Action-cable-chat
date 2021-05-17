import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 480,
    margin: 'auto',
  },
  searchInput: {
    backgroundColor: '#666',
  },
  searchRoot: {
    '& > .Mui-focused, *': { color: '#fff' }
  }

}));

export default useStyles;