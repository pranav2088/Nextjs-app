import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse } from '@mui/material';
import Image from 'next/image'
import logo from './quiz.webp'
import { SpaceDashboard } from '@mui/icons-material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RecommendIcon from '@mui/icons-material/Recommend';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import { useRouter } from 'next/navigation';

import { usePathname } from 'next/navigation';

import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const drawerWidth = 240;


function layout(props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [iscollapse, setIscollapse] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlecollapse = () => {
    setIscollapse(!iscollapse);
  };

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
      // redirect('/api/auth/signin?callbackUrl=/client')
    }
  })



  if (session) {
    let user = session["user"];
    if (user && user.email) {
      let email = user.email;
      console.log('User Email: ', email);
      // setCookie("logged", "true", { maxAge: 60 * 60 * 24 * 30 });
    
    }
  }

  const userLogout = () => {
    signOut();
  }

  const drawer = (
    <div>
      <Toolbar>
        <Image src={logo} height={45} width={45} alt="logo" className='-ml-2 mr-2'></Image>
        <Typography variant="h6" noWrap component="div">
          Next js
        </Typography>
      </Toolbar>
      <Divider />

      <List>
        {['Dashboard',
          'Analytics',
          'Users',
          'Projects',
          'Messages',
          'Settings',
          'Profile',
        ].map((text, index) => (
          <ListItem key={text} disablePadding
            className={
              pathname.startsWith("/" + text.toLowerCase())
                ? "text-sky-600 bg-slate-100"
                : "text-slate-700"
            }
            onClick={() => { router.push("/" + text.toLowerCase()) }}>
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/" + text.toLowerCase()) ? "text-sky-600" : "text-slate-700"}>
                {index === 0 && <SpaceDashboard />}
                {index === 1 && <QueryStatsIcon />}
                {index === 2 && <PeopleAltIcon />}
                {index === 3 && <WorkIcon />}
                {index === 4 && <MailIcon />}
                {index === 5 && <SettingsIcon />}
                {index === 6 && <AccountCircleIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding onClick={handlecollapse}
          className={
            pathname.startsWith("/help")
              ? "text-sky-600"
              : "text-slate-700"}>
          <ListItemButton>
            <ListItemIcon
              className={
                pathname.startsWith("/help")
                  ? "text-sky-600"
                  : "text-slate-700"}>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
            {iscollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>

      </List>

      <Collapse in={iscollapse} timeout={"auto"} unmountOnExit>
        <List className='ml-4'>
          {['Support', 'Contact', 'Docs'].map((text, index) => (
            <ListItem key={text} disablePadding
              className={
                pathname.startsWith("/help")
                  ? "text-sky-600"
                  : "text-slate-700"}>
              <ListItemButton>
                <ListItemIcon
                  className={
                    pathname.startsWith("/help")
                      ? "text-sky-600"
                      : "text-slate-700"}>
                  {index === 0 && <LiveHelpIcon />}
                  {index === 1 && <RecommendIcon />}
                  {index === 2 && <LibraryBooksIcon />}

                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#FFFFFF",
          color: "#2f2f2f",
        }}
      >
        <div className="flex justify-between">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
             Dashboard
            </Typography>
          </Toolbar>
          <div className="mt-3 mr-3 cursor-pointer" onClick={() => userLogout()}>
            <Typography variant="h6" noWrap component="div">
              <LogoutIcon /> Logout
            </Typography>
          </div>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <main>{children}</main>

      </Box>
    </Box>
  );
}

layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  children: PropTypes.array,
};

export default layout;