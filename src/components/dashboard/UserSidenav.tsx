import {
  Calendar,
  MessageSquare,
  User,
  Settings,
  Home,
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

const userNavItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Bookings", url: "/dashboard/bookings", icon: Calendar },
  { title: "Rooms", url: "/dashboard/rooms", icon: Home },
  { title: "Support Tickets", url: "/dashboard/support", icon: MessageSquare },
  { title: "Profile Settings", url: "/dashboard/profile", icon: Settings },
]

export function UserSidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <User className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">User Dashboard</h2>
            <p className="text-sm text-gray-600">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={location.pathname === item.url ? "bg-gray-100 font-semibold" : ""}>
                    <Link to={item.url} className="flex items-center gap-2 w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 w-full">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
