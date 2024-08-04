import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WorkIcon from '@mui/icons-material/Work';
import ListItem from '@mui/material/ListItem';


const menuItems = [
    'Расчет сечения',
    'Расчет БМС',
    'Модуль 3',
    'Модуль 4',
    'Модуль 5',
    'Модуль 6'
]
const ModulesBlock = () => {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Модули" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div">
                    {menuItems.map((text) => (
                        generateItem(text, <WorkIcon />)
                    ))}
                </List>
            </Collapse>
        </List>
    )
}

const generateItem = (text, icon) => (
    <ListItem key={text} disablePadding>
        <ListItemButton>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
)


export default ModulesBlock