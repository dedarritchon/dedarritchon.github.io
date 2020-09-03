import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import registerIcons from './FontAwesome';

registerIcons();

const DATA = [
    {
        href: "https://github.com/dedarritchon",
        aria: "Visit my GitHub profile to learn more about the open source projects I have contributed to",
        icon: ["fab", "github"],
        label: "Github",
    },
    {
        href: "https://www.linkedin.com/in/dedarritchon/",
        aria: "Visit my LinkedIn profile to learn more about my education and work experience",
        icon: ["fab", "linkedin"],
        label: "LinkedIn",
    },
    {
        href: "https://drive.google.com/file/d/1ASG5JTR_lZI1b3scN3kKAgulgOTe4uNh/view?usp=sharing",
        aria: "Visit Google Drive to view and download a copy of my resume",
        icon: ["fas", "file-alt"],
        label: "Resume",
    },
    {
        href: "mailto:dedarritchon@uc.cl",
        aria: "Open a pre-addressed email prompt to me that you can fill out",
        icon: ["fas", "paper-plane"],
        label: "Email me",
    }
];

const Icon = ({ href, aria, icon, label }) => {
    return (
        <span className="button">
            <a href={href} target="_self" aria-label={aria} rel="noopener noreferrer">
                <FontAwesomeIcon className="icon" icon={icon} size="3x" />
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
                    <Icon {...props} key={i} />
                ))}
            </div>
        );
    }
}

export default Buttons;