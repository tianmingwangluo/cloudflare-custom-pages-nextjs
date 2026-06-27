// 1. 在这里引入图标，注意是 `Copy Component Name` 按钮复制的名称
import {
  Activity,
  ArrowRight,
  BadgeAlert,
  BookOpen,
  CheckCircle,
  ChevronsLeftRightEllipsis,
  Construction,
  FileQuestion,
  Github,
  Heart,
  HelpCircle,
  Home,
  Info,
  Languages,
  Lightbulb,
  Loader,
  LoaderCircle,
  Lock,
  type LucideIcon,
  MapPin,
  MessageSquare,
  Moon,
  Network,
  Shield,
  ShieldAlert,
  ShieldBan,
  ShieldCheck,
  ShieldEllipsis,
  Sun,
  TriangleAlert,
  XCircle,
} from "lucide-react";

// 2. 在这里添加你想要的图标到类型列表中
export type IconKey =
  | "shield-ban"
  | "shield"
  | "loader"
  | "badge-alert"
  | "construction"
  | "shield-check"
  | "shield-alert"
  | "shield-ellipsis"
  | "file-question"
  | "sun"
  | "moon"
  | "triangle-alert"
  | "lock"
  | "info"
  | "languages"
  | "book-open"
  | "github"
  | "heart"
  | "home"
  | "arrow-right"
  | "check-circle"
  | "x-circle"
  | "loader-circle"
  | "map-pin"
  | "message-square"
  | "activity"
  | "network"
  | "help-circle"
  | "lightbulb"
  | "chevron-left-right-ellipsis";

// 3. 在这里添加你想要的图标到 `icons` 映射字典中
export const icons: Record<IconKey, LucideIcon> = {
  "shield-ban": ShieldBan,
  shield: Shield,
  loader: Loader,
  "badge-alert": BadgeAlert,
  construction: Construction,
  "shield-check": ShieldCheck,
  "shield-alert": ShieldAlert,
  "shield-ellipsis": ShieldEllipsis,
  "file-question": FileQuestion,
  sun: Sun,
  moon: Moon,
  "triangle-alert": TriangleAlert,
  lock: Lock,
  info: Info,
  languages: Languages,
  "book-open": BookOpen,
  github: Github,
  heart: Heart,
  home: Home,
  "arrow-right": ArrowRight,
  "check-circle": CheckCircle,
  "x-circle": XCircle,
  "loader-circle": LoaderCircle,
  "map-pin": MapPin,
  "message-square": MessageSquare,
  activity: Activity,
  network: Network,
  "help-circle": HelpCircle,
  lightbulb: Lightbulb,
  "chevron-left-right-ellipsis": ChevronsLeftRightEllipsis,
};
