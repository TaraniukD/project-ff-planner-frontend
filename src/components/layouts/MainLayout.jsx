import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import styled, { css, useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { BurgerMenuIcon, MoonIcon, SunIcon } from '../../assets/icons'
import { useAppThemeContext } from '../../styles/theme/provider'
import { SideBar } from '../SideBar'
import { getDesktopStyles, useBreakpointValue } from '../../styles/breakpoints'
import { Text } from '../Text'
import { OpacityButton } from '../buttons/OpacityButton'
import { Button } from '../buttons/Button'
import { FeedbackModal } from '../modals/FeedbackModal'
import { ROUTES } from '../../navigation/routes'
import { useAuthContext } from '../../contexts/auth'
import { gooseCalendar } from '../../assets/images'
import { useDimensions } from '../../hooks'
import { Avatar } from '../Avatar'
import { LanguagePicker } from '../LanguagePicker'

export const MainLayout = () => {
  const { colors, shadows } = useTheme()
  const { themeType, setThemeType } = useAppThemeContext()
  const navigate = useNavigate()
  const { width } = useDimensions()
  const { logger } = useAuthContext()
  const { t } = useTranslation()

  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  const location = useLocation()
  const [selectedRoute, setSelectedRoute] = useState(location.pathname || ROUTES.CALENDAR)
  useEffect(() => setSelectedRoute(location.pathname || ROUTES.CALENDAR), [location.pathname])

  const [searchParams] = useSearchParams()
  const showTitleGooseLogo =
    width >= 1024 &&
    window.location.pathname.includes(ROUTES.CALENDAR) &&
    searchParams.get('calendar-type') === 'day'

  useEffect(() => navigate(selectedRoute), [selectedRoute])

  const iconSize = useBreakpointValue({ mobileValue: 24, tabletValue: 32, desktopValue: 32 })
  const nameFontSize = useBreakpointValue({
    mobileValue: 14,
    tabletValue: 18,
    desktopValue: 18,
  })

  const handleThemeChange = () => setThemeType(themeType === 'light' ? 'dark' : 'light')

  const routeTitles = {
    [ROUTES.PROFILE]: t('User Profile'),
    [ROUTES.CALENDAR]: t('Calendar'),
  }

  const userName = logger?.name || t('Default')

  return (
    <MainWrap>
      <SideBar
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      <ContentWrap>
        <Header>
          <Container>
            <HeaderWrap>
              <BurgerWrap>
                <OpacityButton onClick={() => setIsBurgerMenuOpen(true)}>
                  <BurgerMenuIcon size={iconSize} color={colors.icon} />
                </OpacityButton>
              </BurgerWrap>
              <DesktopTitleWrap>
                {showTitleGooseLogo && (
                  <img src={gooseCalendar} style={{ width: '60px' }} alt='Goose calendar logo' />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Text
                    type='h1'
                    fontSize={32}
                    fontWeight={700}
                    color={colors.text}
                    lineHeight={32}
                    style={{ textShadow: shadows.headingShadow }}
                  >
                    {routeTitles[selectedRoute]}
                  </Text>
                  {showTitleGooseLogo && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Text
                        type='p'
                        fontSize={14}
                        fontWeight={600}
                        style={{ marginRight: '4px' }}
                        color={'primary'}
                      >
                        {t("Let's go")}
                      </Text>
                      <Text type='p' color={'text'} fontWeight={600} fontSize={14}>
                        {t('of the past and focus on the present!')}
                      </Text>
                    </div>
                  )}
                </div>
              </DesktopTitleWrap>
              <TabWrap>
                {selectedRoute === ROUTES.CALENDAR && (
                  <>
                    <Button title={t('Feedback')} onClick={() => setFeedbackModalVisible(true)} />
                    <FeedbackModal
                      visible={isFeedbackModalVisible}
                      setVisible={setFeedbackModalVisible}
                    />
                  </>
                )}
                <InfoWrap>
                  <LanguagePicker color={colors.icon} fontSize={18} />
                  <OpacityButton onClick={handleThemeChange}>
                    {themeType === 'light' ? (
                      <MoonIcon size={iconSize} color={colors.primary} />
                    ) : (
                      <SunIcon size={iconSize} color={colors.primary} />
                    )}
                  </OpacityButton>
                  <Text
                    type='p'
                    color={colors.userNameText}
                    fontWeight={700}
                    fontSize={nameFontSize}
                  >
                    {userName}
                  </Text>
                  <OpacityButton
                    style={{ marginLeft: 8 }}
                    onClick={() => setSelectedRoute(ROUTES.PROFILE)}
                  >
                    <Avatar size={44} name={userName} image={logger?.avatarURL} />
                  </OpacityButton>
                </InfoWrap>
              </TabWrap>
            </HeaderWrap>
          </Container>
        </Header>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </ContentWrap>
    </MainWrap>
  )
}

const MainWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.mainBackground};
  display: flex;
`

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding: 20px 24px;
  ${getDesktopStyles(css`
    width: 75%;
  `)}
`

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
`

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const BurgerWrap = styled.div`
  ${getDesktopStyles(css`
    display: none;
  `)}
`

const DesktopTitleWrap = styled.div`
  display: none;
  ${getDesktopStyles(css`
    display: flex;
    align-items: center;
    gap: 8px;
  `)}
`

const OutletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: 0;
  margin-top: 64px;

  ${getDesktopStyles(css`
    margin-top: 32px;
  `)}
`
