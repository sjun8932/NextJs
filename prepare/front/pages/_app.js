import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';

React.useLayoutEffect= React.useEffect;

const App = ({ Component }) => {
    return (
        <>
            <div>_app.js가 담당하는 공통메뉴 🤷‍♀️🤷‍♀️</div>
            <Component />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default  App;