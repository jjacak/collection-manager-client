import { Outlet } from "react-router-dom";
import classes from './Content.module.css';

const Content = ()=>{
    return <main className={classes.content}>
        <Outlet/>
    </main>
}
export default Content;