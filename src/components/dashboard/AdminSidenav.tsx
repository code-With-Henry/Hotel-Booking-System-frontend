import {
  LayoutDashboard,
  Hotel,
  Calendar,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidenav"

const adminNavItems = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Hotels Management", url: "/admin/hotels", icon: Hotel },
  { title: "Bookings Management", url: "/admin/bookings", icon: Calendar },
  { title: "Users Management", url: "/admin/users", icon: Users },
  { title: "Support Tickets", url: "/admin/support", icon: MessageSquare },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <LayoutDashboard className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-gray-600">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center space-x-2 ${
                          isActive ? "bg-muted text-primary" : ""
                        }`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
