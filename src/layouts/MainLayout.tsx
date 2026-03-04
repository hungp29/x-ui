import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Nav, SideSheet, Button } from '@douyinfe/semi-ui'
import { IconHome, IconApps, IconSetting, IconMenu } from '@douyinfe/semi-icons'
import { useIsMobile } from '../hooks/useIsMobile'

const { Header, Sider, Content, Footer } = Layout

const navItems = [
  { itemKey: '/', text: 'Home', icon: <IconHome /> },
  { itemKey: '/apps', text: 'All Apps', icon: <IconApps /> },
  { itemKey: '/settings', text: 'Settings', icon: <IconSetting /> },
]

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const currentTitle = navItems.find((i) => i.itemKey === location.pathname)?.text ?? 'x-ui'

  const handleNavSelect = ({ itemKey }: { itemKey: string | number }) => {
    navigate(itemKey as string)
    setDrawerOpen(false)
  }

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
          title={<span style={{ fontWeight: 700, fontSize: 18 }}>x-ui</span>}
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
              <span style={{ fontWeight: 700, fontSize: 18 }}>
                {collapsed ? 'X' : 'x-ui'}
              </span>
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
