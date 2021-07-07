import { Fragment, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Breadcrumb from '../components/Breadcrumb'
import Spinner from '../components/Spinner'
import downloadCSV from '../helpers/downloadCSV'
import exceptionsObj from '../constants/exceptions'
import getDaySubscription from '../helpers/getDaySubscription'
import getWeeks from '../helpers/getWeeks'
import products from '../constants/products'
import useSubscription from '../helpers/useSubscription'
import { pickUpPointsAsObj } from '../constants/pickpoints'
import {
  changeApplicationStatus,
  getAllSubscriptions,
  sendEmail,
} from '../firebase/client'

const initialState: any = null

export default function Admin() {
  const { t, lang } = useTranslation('common')
  const [subscriptions, setSubscriptions] = useState(initialState)
  const [tab, onChangeTab] = useState(0)
  const { user, isAdmin, loadingSubscription } = useSubscription()
  const title = t`admin`
  const pendings =
    subscriptions?.filter?.((s) => s.estatPuntRecollida === 'pending') || []
  const accepted =
    subscriptions?.filter?.((s) => s.estatPuntRecollida === 'accepted') || []
  const rejected =
    subscriptions?.filter?.((s) => s.estatPuntRecollida === 'rejected') || []
  const pendingNum = pendings.length ?? '-'
  const rejectedNum = rejected.length ?? '-'

  useEffect(() => {
    getAllSubscriptions().then(setSubscriptions)
  }, [])

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
    <div className="content" key={lang}>
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
          <Tab label={t('admin-subscriptions')} />
          <Tab label={`${t('admin-pendings-applications')} (${pendingNum})`} />
          <Tab label={`${t('admin-rejected-applications')} (${rejectedNum})`} />
          <Tab label={t('admin-products')} />
        </Tabs>
      </AppBar>
      <Card>
        <Box p={3}>
          {!subscriptions && <Spinner style={{ padding: 0 }} />}
          {subscriptions &&
            (() => {
              switch (tab) {
                case 0:
                  return <Subscriptions users={accepted} />
                case 1:
                  return (
                    <ApplicationTable
                      users={pendings}
                      setSubscriptions={setSubscriptions}
                    />
                  )
                case 2:
                  return (
                    <ApplicationTable
                      users={rejected}
                      actions={['accept', 'pending']}
                      setSubscriptions={setSubscriptions}
                    />
                  )
                case 3:
                  return <Products />
              }
            })()}
        </Box>
      </Card>
    </div>
  )
}

function Subscriptions({ users }) {
  const { t, lang } = useTranslation('common')
  const allWeeks = getWeeks(lang)
  const [week, setWeek] = useState(allWeeks[0])
  const productsKeys = Object.keys(products)
  const usersPerPickPoint = users.reduce((t, u) => {
    const s = addSubscription(u, week)
    if (!s.active) return t
    if (!t[u.puntRecollida]) t[u.puntRecollida] = []
    t[u.puntRecollida].push(s)
    return t
  }, {})
  const points = Object.keys(usersPerPickPoint)

  // Order users
  points.forEach((point) => {
    usersPerPickPoint[point] =
      usersPerPickPoint[point]?.sort?.(sortBySubscription)
  })

  const tables = points.map((point) => {
    const pUsers = usersPerPickPoint[point]?.sort?.(sortBySubscription)

    const p = pickUpPointsAsObj[pUsers[0]?.puntRecollida] || {}

    return (
      <Fragment key={point}>
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: `3px solid ${p.color}`,
          }}
        >
          <div
            style={{
              marginRight: 10,
              backgroundColor: p.color,
              width: 16,
              height: 16,
              borderRadius: '50%',
            }}
          />
          {p.name}
        </h3>
        <TableContainer key="pending" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>{t`display-name`}</b>
                </TableCell>
                <TableCell>
                  <b>{t`exceptions`}</b>
                </TableCell>
                {productsKeys.map((prod) => (
                  <TableCell key={prod}>
                    <b>{t(`product-${prod}`)}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pUsers.map((user) => {
                if (!user.active) return null

                return (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.displayName}
                    </TableCell>
                    <TableCell>
                      {user.excepcions
                        ?.map?.((k) => exceptionsObj[k][lang])
                        ?.join?.(', ')}
                    </TableCell>
                    {productsKeys.map((p) => (
                      <TableCell key={p}>{user.sub[p]?.count || '-'}</TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    )
  })

  return (
    <>
      <select
        value={week.name}
        onChange={(e) =>
          setWeek(allWeeks.find((w) => w.name === e.target.value))
        }
      >
        {allWeeks.map((w) => (
          <option key={w.name} value={w.name}>
            {w.name}
          </option>
        ))}
      </select>
      <Button onClick={() => window.print()}>Imprimir</Button>
      <Button onClick={() => downloadCSV(usersPerPickPoint, week)}>
        Descarregar CSV
      </Button>
      <div id="table-to-print">{tables}</div>
    </>
  )
}

function Products() {
  return <div>En construcció...</div>
}

function ApplicationTable({
  users,
  actions = ['accept', 'reject'],
  setSubscriptions,
}) {
  const { t } = useTranslation('common')
  const margin = { margin: '0 5px' }

  function updateStatus(user, status) {
    setSubscriptions((s) =>
      s.map((u) =>
        u.id === user.id ? { ...u, estatPuntRecollida: status } : u
      )
    )
    changeApplicationStatus(user.id, user, status).then(async () => {
      if (status !== 'accepted' && status !== 'rejected') return

      const statusName = { accepted: 'acceptat', rejected: 'rebutjat' }[status]
      const p = pickUpPointsAsObj[user.puntRecollida] || {}

      await sendEmail({
        to: user.email,
        subject: `Sòl Ben Moll ha ${statusName} la sol·licitud`,
        body: `
        <h2>La sol·licitud s'ha ${statusName}</h2>
        <p>Hola <b>${
          user.displayName || user.email
        }</b>, s'ha <b>${statusName}</b> la seva sol·licitud en punt de recollida <b>"${
          p.name
        }"</b></p>
        <p>Atentament,<p>
          <p><i>L'Equip de Sòl Ben Moll</i></b>
          <p><i>solbenmoll@gmail.com</i></p>
          `,
      })
      alert(
        `S'ha enviat un email a ${user.email} per informar-li que la sol·licitud a ${p.name} s'ha ${statusName}.`
      )
    })
  }

  function accept(user) {
    if (!window.confirm(t`accept-confirm`)) return
    updateStatus(user, 'accepted')
  }

  function reject(user) {
    if (!window.confirm(t`reject-confirm`)) return
    updateStatus(user, 'rejected')
  }

  function markAsPending(user) {
    if (!window.confirm(t`mark-as-pending-confirm`)) return
    updateStatus(user, 'pending')
  }

  return (
    <TableContainer key="pending" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t`display-name`}</TableCell>
            <TableCell>{t`email`}</TableCell>
            <TableCell>{t`pickup-point`}</TableCell>
            <TableCell>{t`action`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const p = pickUpPointsAsObj[user.puntRecollida] || {}
            const actionsAvailable = {
              accept: (
                <Button
                  onClick={() => accept(user)}
                  style={margin}
                  key="accept"
                  variant="outlined"
                >{t`accept`}</Button>
              ),
              reject: (
                <Button
                  onClick={() => reject(user)}
                  style={margin}
                  key="reject"
                  variant="outlined"
                >{t`reject`}</Button>
              ),
              pending: (
                <Button
                  onClick={() => markAsPending(user)}
                  style={margin}
                  key="pending"
                  variant="outlined"
                >{t`mark-as-pending`}</Button>
              ),
            }

            return (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.displayName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        marginRight: 10,
                        backgroundColor: p.color,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                      }}
                    />
                    {p.name}
                  </div>
                </TableCell>
                <TableCell>
                  {actions.map((action) => actionsAvailable[action] || null)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function addSubscription(user, week) {
  const exceptions = user.weekExceptions || {}
  const [sub, active] = getDaySubscription(
    exceptions[week.id] || user,
    week.weekIndex
  )
  return { ...user, sub, active }
}

function sortBySubscription(userA, userB) {
  const petitaA = userA?.sub?.petita?.count || 0
  const petitaB = userB?.sub?.petita?.count || 0
  const mitjanaA = userA?.sub?.mitjana?.count || 0
  const mitjanaB = userB?.sub?.mitjana?.count || 0
  const granA = userA?.sub?.gran?.count || 0
  const granB = userB?.sub?.gran?.count || 0

  if (petitaA < petitaB) return 1
  if (petitaA > petitaB) return -1
  if (mitjanaA < mitjanaB) return 1
  if (mitjanaA > mitjanaB) return -1
  if (granA < granB) return 1
  if (granA > granB) return -1

  return 0
}
