import { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { SideDrawer } from './SideDrawer';
import { useSelector } from '../Global/bind-react/useSelector';
import { useSetGlobalContext } from '../Global/bind-react/useSetGlobal';
import RedoIcon from '@material-ui/icons/Redo';
import { useHistory } from 'react-router-dom';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PersonIcon from '@material-ui/icons/Person';
import { removeLocalStorage } from "../helper/tool/persistLocalStorage"
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: 'auto auto auto 2rem',
    width: '100%',
    maxWidth: 600,
    minWidth: 200,
    display: 'flex',
  },
  searchWrapper: {
    width: 'fit-content',
    margin: 'auto',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const PrimarySearchAppBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const setGlobal = useSetGlobalContext();
  const context = useSelector((context) => ({
    listMessage: context.listMessage,
    primaryDisplayName: context.displayName,
    auth: context.auth,
    listUserActive: context.listUserActive,
    id: context.id
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSignOut = () => {
    history.push('/signin');
    setMobileMoreAnchorEl(null);
    setGlobal({
      id: null,
      auth: false,
      token: null,
      refreshToken: null,
      displayName: null,
      socketID: null,
    });
    removeLocalStorage()
  };
  const handleShowChat = () => {
    if (context.auth) {
      history.push('/chat');
      setMobileMoreAnchorEl(null);
    }
  };
  const handleSignIn = () => {
    history.push('/signin');
    setMobileMoreAnchorEl(null);
  };
  const handleSignUp = () => {
    history.push('/signup');
    setMobileMoreAnchorEl(null);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {context.auth ? (
        <div>
          <MenuItem onClick={handleShowChat}>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label='show 11 new notifications' color='inherit'>
              <Badge badgeContent={11} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label='account of current user'
              aria-controls='primary-search-account-menu'
              aria-haspopup='true'
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <IconButton
              aria-label='account of current user'
              aria-controls='primary-search-account-menu'
              aria-haspopup='true'
              color='inherit'
            >
              <RedoIcon />
            </IconButton>
            <p>Sign Out</p>
          </MenuItem>
        </div>
      ) : (
        <>
          <MenuItem onClick={handleSignIn}>
            <IconButton
              aria-controls='primary-search-account-menu'
              aria-haspopup='true'
              color='inherit'
            >
              <FingerprintIcon />
            </IconButton>
            <p>Sign In</p>
          </MenuItem>
          <MenuItem onClick={handleSignUp}>
            <IconButton aria-haspopup='true' color='inherit'>
              <PersonIcon />
            </IconButton>
            <p>Sign Up</p>
          </MenuItem>
        </>
      )}
    </Menu>
  );
  const drawerSide = 'left';
  return (
    <div className={classes.grow}>
      <SideDrawer
        listMessage={context.listMessage}
        anchor={drawerSide}
        toggleDrawer={toggleDrawer}
        drawerState={drawerState}
        listUserActive={context.listUserActive}
        userID={{ id: context.id }}
      />
      <AppBar position='fixed' color='secondary'>
        <Toolbar>
          {context.auth ? (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer(drawerSide, true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography className={classes.title} variant='h6' noWrap>
            {context.auth ? context.primaryDisplayName : 'Chat'}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchWrapper}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'SEARCH' }}
              />
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {context.auth ? (
              <>
                <IconButton aria-label='show 4 new mails' color='inherit'>
                  <Badge badgeContent={4} color='secondary'>
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label='show 17 new notifications'
                  color='inherit'
                >
                  <Badge badgeContent={17} color='secondary'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <IconButton
                  aria-label='Sign Out'
                  color='inherit'
                  onClick={handleSignOut}
                >
                  <RedoIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label='Sign In'
                  color='inherit'
                  onClick={handleSignIn}
                >
                  <FingerprintIcon />
                </IconButton>
                <IconButton
                  aria-label='Sign Of'
                  color='inherit'
                  onClick={handleSignUp}
                >
                  <PersonIcon />
                </IconButton>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
