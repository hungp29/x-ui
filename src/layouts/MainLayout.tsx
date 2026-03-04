import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout, Nav, SideSheet, Button } from '@douyinfe/semi-ui'
import { IconHome, IconApps, IconSetting, IconMenu } from '@douyinfe/semi-icons'
import { useIsMobile } from '../hooks/useIsMobile'
import { useSwipeDrawer } from '../hooks/useSwipeDrawer'

const { Header, Sider, Content, Footer } = Layout

export default function MainLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navItems = [
    { itemKey: '/', text: t('nav.home'), icon: <IconHome /> },
    { itemKey: '/apps', text: t('nav.allApps'), icon: <IconApps /> },
    { itemKey: '/settings', text: t('nav.settings'), icon: <IconSetting /> },
  ]

  const currentTitle = navItems.find((i) => i.itemKey === location.pathname)?.text ?? 'MMFamily'

  const handleNavSelect = ({ itemKey }: { itemKey: string | number }) => {
    navigate(itemKey as string)
    setDrawerOpen(false)
  }

  useSwipeDrawer(
    drawerOpen,
    () => setDrawerOpen(true),
    () => setDrawerOpen(false),
  )

  if (isMobile) {
    return (
      <Layout className="mobile-layout">
        <Header className="mobile-header">
          <Button
            icon={<IconMenu />}
            theme="borderless"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
          />
          <span className="mobile-header-title">{currentTitle}</span>
        </Header>

        <SideSheet
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/favicon-32x32.png" width={24} height={24} alt="x-ui logo" />
              <span style={{ fontWeight: 700, fontSize: 18 }}>MMFamily</span>
            </div>
          }
          visible={drawerOpen}
          onCancel={() => setDrawerOpen(false)}
          placement="left"
          width={240}
          bodyStyle={{ padding: 0 }}
          headerStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
        >
          <Nav
            selectedKeys={[location.pathname]}
            items={navItems}
            onSelect={handleNavSelect}
            style={{ height: '100%', borderRight: 'none' }}
          />
        </SideSheet>

        <Content className="main-content">
          <Outlet />
        </Content>

        <Footer className="mobile-footer">
          x-ui © {new Date().getFullYear()}
        </Footer>
      </Layout>
    )
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <Nav
          defaultSelectedKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          isCollapsed={collapsed}
          onCollapseChange={setCollapsed}
          items={navItems}
          onSelect={handleNavSelect}
          header={{
            logo: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', fontStyle: 'normal' }}>
                <img src="/favicon-32x32.png" width={28} height={28} alt="x-ui logo" style={{ flexShrink: 0 }} />
                {!collapsed && <span style={{ fontWeight: 700, fontSize: 18, whiteSpace: 'nowrap', fontStyle: 'normal' }}>MMFamily</span>}
              </div>
            ),
          }}
          footer={{ collapseButton: true }}
          style={{ height: '100%' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: 'var(--semi-color-bg-1)',
            borderBottom: '1px solid var(--semi-color-border)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            height: 60,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>{currentTitle}</span>
        </Header>
        <Content className="main-content">
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            padding: '12px 24px',
            fontSize: 12,
            color: 'var(--semi-color-text-2)',
            borderTop: '1px solid var(--semi-color-border)',
          }}
        >
          x-ui © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}
