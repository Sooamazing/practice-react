import React, {createContext} from 'react';
import styles from './Career.module.scss';
import Form from './Form';
import Title from './Title';
import FormContext from '../contexts/FormContext';

function Career(props) {

    // form - name, email, phone, message
    const form = {
        name: '안녕?',
        email: 'ttt@na.com',
        phone: '010',
        message: '히히. 잘 부탁해.'
    }


    // form 정보를 관리할 수 있는 context api 생성





    return (
        <FormContext.Provider value={form}>
            <section className={styles.container}>
                <Title />
                <Form />
            </section>
        </FormContext.Provider>
    );
}

export default Career;