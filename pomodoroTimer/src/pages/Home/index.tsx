import { HandPalm, Play } from 'phosphor-react'
import React, { createContext, useEffect, useState } from 'react'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { differenceInSeconds } from 'date-fns'
import NewCycleForm from './components/NewCycleForm'
import Countdown from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O intervalo deve ser no minímo de 5 minutos').max(60, 'O intervalo deve ser no máximo de 60 minutos')
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>


interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CycleContext = createContext({} as CyclesContextType)

export default function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle: any = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle;
                }
            }),
        )
    }

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        reset();
        setAmountSecondsPassed(0)
    }

    function handleInterruptCycle() {

        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle;
            }
        }
        )
        )
        setActiveCycleId(null)
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
                    <StopCountdownButton onClick={() => handleInterruptCycle()} type='button'>
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
