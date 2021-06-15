import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

import Breadcrumb from '../components/Breadcrumb'
import Spinner from '../components/Spinner'
import useSubscription from '../helpers/useSubscription'
import { useEffect, useState } from 'react';

export default function Admin() {
  const { t } = useTranslation('common')
  const [tab, onChangeTab] = useState(0)
  const { user, isAdmin, loadingSubscription } = useSubscription()
  const title = t`admin`


  if (user === null) {
    Router.push('/inici-sessio')
    return <Spinner />
  }

  if (typeof user === 'undefined' || loadingSubscription) {
    return <Spinner />
  }

  if (!isAdmin) {
    Router.push('/compte')
    return <Spinner />
  }

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={title}
        links={[
          {
            href: '/',
            name: 'home',
          },
          {
            href: '/compte',
            name: 'account',
          },
        ]}
      />
      <h2>{title}</h2>
      <AppBar position="static" color="transparent">
        <Tabs
          value={tab}
          style={{ fontSize: 12 }}
          onChange={(e, val) => onChangeTab(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t`admin-subscriptions`} />
          <Tab label={t`admin-products`} />
          <Tab label={t`admin-pendings-applications`} />
        </Tabs>
      </AppBar>
      <Card><Box p={3}>
        {tab}
      </Box>
      </Card>
    </div>
  )
}

function Applications({ onLoadApplications }) {
  useEffect(() => {
    onLoadApplications()
  }, [])

  return <Spinner style={{ padding: 0 }} />
}

function Subscriptions({ onLoadSubscriptions }) {
  useEffect(() => {
    onLoadSubscriptions()
  }, [])

  return <Spinner style={{ padding: 0 }} />
}

function Products({ onLoadProducts }) {
  useEffect(() => {
    onLoadProducts()
  }, [])

  return <Spinner style={{ padding: 0 }} />
}
