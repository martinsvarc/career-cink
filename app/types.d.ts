// Add YouTube iframe API types
interface YT {
  Player: any
  PlayerState: {
    UNSTARTED: number
    ENDED: number
    PLAYING: number
    PAUSED: number
    BUFFERING: number
    CUED: number
  }
}

// Add Wistia types
interface Wistia {
  api: any
  embed: any
}

interface Window {
  Calendly?: any
  calendlyPrefill?: {
    name?: string
    email?: string
    [key: string]: string | undefined
  }
  YT?: YT
  Wistia?: Wistia
  onYouTubeIframeAPIReady?: () => void
}
