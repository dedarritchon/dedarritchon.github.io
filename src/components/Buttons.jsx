import React, { Component } from 'react';

import GitHub from './../assets/icons/GitHub'
import LinkedIn from './../assets/icons/LinkedIn'
import File from './../assets/icons/File'
import Email from './../assets/icons/Email'

const DATA = [
    {
        href: "https://github.com/dedarritchon",
        aria: "Visit my GitHub profile to learn more about the projects I have created and contributed to",
        icon: <GitHub />,
        label: "Github",
    },
    {
        href: "https://www.linkedin.com/in/dedarritchon/",
        aria: "Visit my LinkedIn profile to learn more about my education and work experience",
        icon: <LinkedIn />,
        label: "LinkedIn",
    },
    {
        href: "https://drive.google.com/file/d/1ASG5JTR_lZI1b3scN3kKAgulgOTe4uNh/view?usp=sharing",
        aria: "Visit Google Drive to view and download a copy of my resume",
        icon: <File />,
        label: "Resume",
    },
    {
        href: "mailto:dedarritchon@uc.cl",
        aria: "Open a pre-addressed email prompt to me that you can fill out",
        icon: <Email />,
        label: "Email",
    }
];

const Button = ({ href, aria, icon, label }) => {
    return (
        <span className="button-container">
            <a className="button" href={href} target="_self" aria-label={aria} rel="noopener noreferrer">
                <div className="icon">{icon}</div>
                <span className="icon_title">{label}</span>
            </a>
        </span>
    );
};

class Buttons extends Component {
    render() {
        return (
            <div>
                {DATA.map((props, i) => (
                    <Button {...props} key={i} />
                ))}
            </div>
        );
    }
}

export default Buttons;
