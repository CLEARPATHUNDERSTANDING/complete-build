"use client";

import type { LucideProps } from "lucide-react";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Clock,
  Cog,
  CreditCard,
  Crown,
  DollarSign,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  HelpCircle,
  Home,
  Info,
  Landmark,
  LayoutDashboard,
  LineChart,
  Lock,
  LucideIcon,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Newspaper,
  Pencil,
  Search,
  Settings,
  Shield,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Trophy,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

export type IconName =
  | "activity"
  | "alert-circle"
  | "arrow-left"
  | "arrow-right"
  | "bar-chart-3"
  | "bell"
  | "book-open"
  | "bot"
  | "briefcase"
  | "building"
  | "calendar"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "circle"
  | "clock"
  | "cog"
  | "credit-card"
  | "crown"
  | "dollar-sign"
  | "flame"
  | "globe"
  | "graduation-cap"
  | "heart"
  | "help-circle"
  | "home"
  | "info"
  | "landmark"
  | "layout-dashboard"
  | "line-chart"
  | "lock"
  | "mail"
  | "menu"
  | "message-square"
  | "moon"
  | "newspaper"
  | "pencil"
  | "search"
  | "settings"
  | "shield"
  | "sparkles"
  | "star"
  | "sun"
  | "target"
  | "trending-down"
  | "trending-up"
  | "triangle-alert"
  | "trophy"
  | "user"
  | "users"
  | "wallet"
  | "x"
  | "zap";

const iconMap: Record<IconName, LucideIcon> = {
  "activity": Activity,
  "alert-circle": AlertCircle,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "bar-chart-3": BarChart3,
  "bell": Bell,
  "book-open": BookOpen,
  "bot": Bot,
  "briefcase": Briefcase,
  "building": Building2,
  "calendar": Calendar,
  "check": Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "circle": Circle,
  "clock": Clock,
  "cog": Cog,
  "credit-card": CreditCard,
  "crown": Crown,
  "dollar-sign": DollarSign,
  "flame": Flame,
  "globe": Globe,
  "graduation-cap": GraduationCap,
  "heart": Heart,
  "help-circle": HelpCircle,
  "home": Home,
  "info": Info,
  "landmark": Landmark,
  "layout-dashboard": LayoutDashboard,
  "line-chart": LineChart,
  "lock": Lock,
  "mail": Mail,
  "menu": Menu,
  "message-square": MessageSquare,
  "moon": Moon,
  "newspaper": Newspaper,
  "pencil": Pencil,
  "search": Search,
  "settings": Settings,
  "shield": Shield,
  "sparkles": Sparkles,
  "star": Star,
  "sun": Sun,
  "target": Target,
  "trending-down": TrendingDown,
  "trending-up": TrendingUp,
  "triangle-alert": TriangleAlert,
  "trophy": Trophy,
  "user": User,
  "users": Users,
  "wallet": Wallet,
  "x": X,
  "zap": Zap,
};

type IconProps = LucideProps & {
  name: IconName | string;
  fallback?: IconName;
};

export default function Icon({
  name,
  fallback = "circle",
  ...props
}: IconProps) {
  const SafeIcon =
    iconMap[(name as IconName)] ?? iconMap[fallback] ?? Circle;

  return <SafeIcon {...props} />;
}