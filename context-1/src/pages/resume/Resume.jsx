import React from 'react';
import styles from './Resume.module.scss';
import Career from '../../layout/career/ui/Career';

const Resume = () => {
    return (
        <div className={styles.resume}>
            <Career />
        </div>
    );
}

export default Resume;