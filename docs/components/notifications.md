---
title: Notifications
cssPath: pivotal-ui/css/notifications
reactPath: pivotal-ui/react/notifications
reactComponents:
- Notifications
- AlertNotifications
- NotificationItem
---

```jsx
//title=No notifications
<Notifications/>
```

```jsx
//title=With notifications
<Notifications>
  <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
    <Flag image={<h3 className="mvn btn btn-brand btn-sm phl">New</h3>}>
      <h5 className="media-heading mbn type-dark-gray">Notification</h5>
      <p className="type-sm type-accent-gray mvn">Click for Gif</p>
    </Flag>
  </NotificationItem>
</Notifications>
```

```jsx
//title=Notification sizing
<div>
  <Notifications size="h1">
    <NotificationItem>Stuff</NotificationItem>
  </Notifications>

  <Notifications size="h2">
    <NotificationItem key={1}>Stuff</NotificationItem>
    <NotificationItem key={2}>Stuff</NotificationItem>
    <NotificationItem key={3}>Stuff</NotificationItem>
    <NotificationItem key={4}>Stuff</NotificationItem>
    <NotificationItem key={5}>Stuff</NotificationItem>
  </Notifications>

  <AlertNotifications size="h3">
    <NotificationItem>Stuff</NotificationItem>
  </AlertNotifications>

  <Notifications size="h4">
    <NotificationItem key={1}>Stuff</NotificationItem>
    <NotificationItem key={2}>Stuff</NotificationItem>
    <NotificationItem key={3}>Stuff</NotificationItem>
    <NotificationItem key={4}>Stuff</NotificationItem>
    <NotificationItem key={5}>Stuff</NotificationItem>
  </Notifications>

  <AlertNotifications size="h5">
    <NotificationItem>Stuff</NotificationItem>
  </AlertNotifications>
</div>
```

```jsx
//title=No alerts
<AlertNotifications/>
```

```jsx
//title=With alerts
<div>
  <AlertNotifications>
    <NotificationItem href="http://media.giphy.com/media/Qvw9p4uX7IBy0/giphy.gif">
      <Flag image={<Icon src="warning" className="h4 mrm" style={{fill: '#B38F1B'}}/>}>
        <h5 className="media-heading mbn type-dark-gray">WARNING</h5>
        <p className="type-sm type-accent-gray mvn">Click for Cute Gif</p>
      </Flag>
    </NotificationItem>
  </AlertNotifications>
</div>
```

If you want to customize the notification dropdown, you can use `className` to
add a modifier class to the `btn-group`. `id` and `style` will be applied to
the notification button.

## Props

### Notifications/AlertNotifications props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`size` | no | oneOf('h1', 'h2', 'h3', 'h4', 'h5', 'h6') | | Size of the notification