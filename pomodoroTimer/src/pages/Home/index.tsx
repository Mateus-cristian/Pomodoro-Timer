import { Play } from 'phosphor-react'
import React from 'react'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'

export default function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>

                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput placeholder='De um nome para seu projeto'
                        type="text" id='task'
                        list="task-Suggestions" />


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

                <StartCountdownButton type='submit'>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}
