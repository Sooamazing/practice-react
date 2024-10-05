import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';

// Context 관리 예시
const EditContext = React.createContext();

const MyComponent = () => {
    const { isEdit, setIsEdit } = useContext(EditContext);
    const queryClient = useQueryClient();

    // react-query로 서버에서 데이터 받아오기
    const { data, isLoading, error } = useQuery('getData', fetchData);

    // react-hook-form 사용
    const { register, handleSubmit, reset } = useForm({
        defaultValues: data || {
            name: '',
            hobby: '',
            consent: false,
            memo: '',
        },
    });

    // 수정 API 호출 시 사용하는 mutation
    const mutation = useMutation(patchData, {
        onSuccess: () => {
            // 수정 후 데이터가 stale 상태가 되었다고 간주하고 refetch
            queryClient.invalidateQueries('getData');
            setIsEdit(false);
        },
    });

    // 제출 함수
    const onSubmit = (formData) => {
        mutation.mutate(formData);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <>
            {isEdit ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        이름:
                        <input {...register('name')} />
                    </label>
                    <label>
                        취미:
                        <select {...register('hobby')}>
                            <option value="reading">Reading</option>
                            <option value="gaming">Gaming</option>
                            <option value="coding">Coding</option>
                        </select>
                    </label>
                    <label>
                        동의:
                        <input type="checkbox" {...register('consent')} />
                    </label>
                    <label>
                        메모:
                        <textarea {...register('memo')} />
                    </label>
                    <button type="submit">저장</button>
                </form>
            ) : (
                <div>
                    <p>이름: {data.name}</p>
                    <p>취미: {data.hobby}</p>
                    <p>동의: {data.consent ? '동의함' : '동의 안 함'}</p>
                    <p>메모: {data.memo}</p>
                    <button onClick={() => setIsEdit(true)}>수정하기</button>
                </div>
            )}
        </>
    );
};

// 서버로부터 데이터 가져오기
async function fetchData() {
    const res = await fetch('/api/getData');
    return res.json();
}

// 서버에 데이터 수정하기
async function patchData(newData) {
    const res = await fetch('/api/patchData', {
        method: 'PATCH',
        body: JSON.stringify(newData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.json();
}

export default MyComponent;
