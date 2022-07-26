import React, { useContext } from 'react'
import { CycleContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
export default function History() {

    const { cycles } = useContext(CycleContext)
    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => (
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutes</td>
                                <td>{formatDistanceToNow(cycle.startDate, {
                                    addSuffix: true,
                                    locale: ptBR,
                                })}</td>
                                {cycle.finishedDate && <td><Status statusColor="green">Concluído</Status> </td>}
                                {cycle.interruptedDate && <td><Status statusColor="red">Interrompido</Status>   </td>}
                                {(!cycle.interruptedDate && !cycle.finishedDate) && <td><Status statusColor="yellow">Em andamento</Status> </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
