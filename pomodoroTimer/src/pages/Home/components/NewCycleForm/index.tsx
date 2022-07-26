import React, { useContext, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

import { CycleContext } from '../..';

export default function NewCycleForm() {
    const { activeCycle } = useContext(CycleContext)
    const { register } = useFormContext()

    return (
        <>
            <FormContainer>

                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput placeholder='De um nome para seu projeto'
                    type="text" id='task'
                    list="task-Suggestions"
                    {...register('task')}
                    disabled={!!activeCycle}
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
                    step={1}
                    min={1}
                    max={60}
                    disabled={!!activeCycle}
                    {...register('minutesAmount', { valueAsNumber: true })}
                />
                <span>minutos.</span>
            </FormContainer>
        </>
    )
}
