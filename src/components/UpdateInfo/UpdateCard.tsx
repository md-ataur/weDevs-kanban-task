import React, { useEffect, useState } from 'react';
import { Type } from 'react-feather';
import Editable from '../Editable/Editable';
import Modal from '../Modal/Modal';
import './UpdateInfo.css';

const UpdateCard = (props: any) => {
    const [values, setValues] = useState({ ...props.card });

    useEffect(() => {
        props.updateCard(props.card?.id, props.boardId, values);
    }, [values]);

    return (
        <Modal onClose={() => props.onClose()}>
            <div className="updateinfo">
                <div className="updateinfo_box">
                    <div className="updateinfo_box_title">
                        <Type />
                        <p>Update Title</p>
                    </div>
                    <Editable
                        text={values.title}
                        default={values.title}
                        buttonText={'Update'}
                        onSubmitFn={(value: Object) => setValues({ ...values, title: value })}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default UpdateCard;
