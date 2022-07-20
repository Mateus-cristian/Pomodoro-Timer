import { Play } from 'phosphor-react'
import React, { useState } from 'react'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O intervalo deve ser no minímo de 5 minutos').max(60, 'O intervalo deve ser no máximo de 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function Home() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleSubmitForm(data: NewCycleFormData) {
        console.log(data)
        reset();
    }

    const task = watch('task')
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <FormContainer>

                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput placeholder='De um nome para seu projeto'
                        type="text" id='task'
                        list="task-Suggestions"
                        {...register('task')}
                    />


                    <datalist id="task-Suggestions">
                        <option value="estudar"></option>
                        <option value="fazer compras"></option>
                        <option value="jogar games"></option>
                        <option value="cozinhar"></option>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>


                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}
