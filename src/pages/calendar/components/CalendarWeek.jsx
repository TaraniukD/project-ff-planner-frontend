import styled, { css } from 'styled-components'
import { getMobileStyles } from '../../../styles/breakpoints'
import { OpacityButton, Text } from '../../../components'
import { useWeekDays } from '../hooks/useWeekDays'

export const CalendarWeek = ({ selectedDate, setSelectedDate, calendarType }) => {
  const week = useWeekDays(selectedDate)

  const isDayView = calendarType === 'day'

  return (
    <WeekList>
      {week.map(({ text, date }, index) => {
        const isSelected = date.getDay() === selectedDate?.getDay()
        const isWeekend = [6, 0].includes(date.getDay())

        return (
          <WeekDay key={index} isDayView={isDayView} onClick={() => setSelectedDate(date)}>
            <Text
              style={{ textTransform: 'uppercase' }}
              type='h4'
              color={!isDayView && isWeekend ? 'primary' : 'calendarWeekDayText'}
              mobileStyles={css`
                font-size: 16px;
              `}
            >
              {text}
            </Text>
            {isDayView && (
              <WeekNumberWrapper selected={isSelected}>
                <Text
                  style={{ textTransform: 'uppercase' }}
                  type='h4'
                  color={isSelected ? 'white' : 'userNameText'}
                  mobileStyles={css`
                    font-size: 16px;
                  `}
                >
                  {date.getDate()}
                </Text>
              </WeekNumberWrapper>
            )}
          </WeekDay>
        )
      })}
    </WeekList>
  )
}

const WeekList = styled.section`
  ${({ theme: { colors } }) => css`
    display: flex;
    margin-bottom: 16px;
    justify-content: space-around;
    list-style: none;
    border: 1px solid ${colors.calendarBorder};
    border-radius: 8px;
    background: ${colors.content};
  `}
`

const WeekDay = styled(OpacityButton)`
  ${({ disabled, isDayView }) => css`
    opacity: ${disabled && isDayView ? 0.5 : 1};
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 6px;
    width: calc(100% / 7);
    padding: 10px 5px;
  `}
`

const WeekNumberWrapper = styled.div`
  ${({ selected, theme: { colors } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;

    background: ${selected ? colors.primary : 'transparent'};
    border-radius: 8px;

    ${getMobileStyles(css`
      width: 20px;
      height: 20px;
    `)}
  `}
`
