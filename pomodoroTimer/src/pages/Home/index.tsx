import { HandPalm, Play } from 'phosphor-react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { differenceInSeconds } from 'date-fns'
import NewCycleForm from './components/NewCycleForm'
import Countdown from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { CycleContext } from '../../contexts/CycleContext'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O intervalo deve ser no minímo de 5 minutos').max(60, 'O intervalo deve ser no máximo de 60 minutos')
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>



export default function Home() {
    const { interruptCurrentCycle, createNewCycle, activeCycle } = useContext(CycleContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset();
    }

    const task = watch('task')
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form
                onSubmit={handleSubmit(handleCreateNewCycle)}
            >

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={() => interruptCurrentCycle()} type='button'>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}
