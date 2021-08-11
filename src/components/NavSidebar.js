import 'react-bootstrap-drawer/lib/style.css';
import React, { useState } from 'react';
import {
    Collapse,
} from 'react-bootstrap';
import { Drawer, } from 'react-bootstrap-drawer';
import { Link } from 'react-router-dom';

const NavSidebar = (props) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(!open);

    return (
        <Drawer { ...props }>
            <Drawer.Toggle onClick={ handleToggle } />

            <Collapse in={ open }>
                <Drawer.Overflow>
                    <Drawer.ToC>

                        <Link className="react-bootstrap-drawer-toc-header nav-link" to='/dashboard'>
                            Dashboard
                        </Link>
                        <Link className="react-bootstrap-drawer-toc-header nav-link" to='/crearpost'>
                            Crear Post
                        </Link>
                        <Link className="react-bootstrap-drawer-toc-header nav-link" to='/'>
                            Ir a blog
                        </Link>
                    </Drawer.ToC>
                </Drawer.Overflow>
            </Collapse>
        </Drawer>
    );
};

export default NavSidebar