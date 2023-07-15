import { styled } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { DarkColor } from 'styles/constants/dark'
import { LightColor } from 'styles/constants/light'

const StyledContainer = styled(ToastContainer)`
  .Toastify__toast {
    // padding-bottom: 5px;
    border-radius: 8px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .Toastify__toast-body {
    padding: 0;
  }
  .Toastify__toast-icon {
    display: none;
  }
  .Toastify__toast--success {
    &.Toastify__toast-theme--light {
      background: ${LightColor.NotificationsGreen01};
      border: 1px solid ${LightColor.NotificationsGreen02};
      .describe {
        color: ${LightColor.TextColor90};
      }
      .link {
        color: ${LightColor.TextColorHighlight};
      }
    }
    &.Toastify__toast-theme--dark {
      background: ${DarkColor.NotificationsGreen01};
      border: 1px solid ${DarkColor.NotificationsGreen02};
      .describe {
        color: ${DarkColor.TextColor90};
      }
      .link {
        color: ${DarkColor.TextColorHighlight};
      }
    }
  }
  .Toastify__toast--error {
    &.Toastify__toast-theme--light {
      background: ${LightColor.NotificationsRed01};
      border: 1px solid ${LightColor.NotificationsRed02};
      .describe {
        color: ${LightColor.TextColor90};
      }
    }
    &.Toastify__toast-theme--dark {
      background: ${DarkColor.NotificationsRed01};
      border: 1px solid ${DarkColor.NotificationsRed02};
      .describe {
        color: ${DarkColor.TextColor90};
      }
    }
  }
  .Toastify__toast--warning {
    &.Toastify__toast-theme--light {
      background: ${LightColor.NotificationsYellow01};
      border: 1px solid ${LightColor.NotificationsYellow02};
      .describe {
        color: ${LightColor.TextColor90};
      }
    }
    &.Toastify__toast-theme--dark {
      background: ${DarkColor.NotificationsYellow01};
      border: 1px solid ${DarkColor.NotificationsYellow02};
      .describe {
        color: ${DarkColor.TextColor90};
      }
    }
  }
  .Toastify__toast--info {
    &.Toastify__toast-theme--light {
      background: ${LightColor.NotificationsBlue01};
      border: 1px solid ${LightColor.NotificationsBlue02};
      .describe {
        color: ${LightColor.TextColor90};
      }
    }
    &.Toastify__toast-theme--dark {
      background: ${DarkColor.NotificationsBlue01};
      border: 1px solid ${DarkColor.NotificationsBlue02};
      .describe {
        color: ${DarkColor.TextColor90};
      }
    }
  }
`

export default StyledContainer
