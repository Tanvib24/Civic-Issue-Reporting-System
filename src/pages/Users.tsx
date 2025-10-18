import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Crown, 
  Shield,
  User,
  Mail,
  Calendar,
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { mockUsers } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === 'all' || user.role === selectedRole;
    
    return searchMatch && roleMatch;
  });

  const roles = [...new Set(mockUsers.map(user => user.role))];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'staff': return Shield;
      case 'citizen': return User;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'staff': return 'bg-warning text-warning-foreground';
      case 'citizen': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTierFromPoints = (points: number) => {
    if (points >= 1000) return { name: 'Gold', color: 'text-yellow-600' };
    if (points >= 500) return { name: 'Silver', color: 'text-gray-500' };
    if (points >= 100) return { name: 'Bronze', color: 'text-orange-600' };
    return { name: 'New', color: 'text-muted-foreground' };
  };

  return (
    <div className="flex-1 space-y-6">
      <Header 
        title="User Management" 
        subtitle="Manage citizens, staff, and administrator accounts"
      />

      <div className="p-6 space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockUsers.length}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs font-medium text-success">
                      +8%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      this month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <User className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Citizens
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockUsers.filter(u => u.role === 'citizen').length}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs font-medium text-success">
                      +12%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      new signups
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Staff Members
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockUsers.filter(u => u.role === 'staff').length}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs text-muted-foreground">
                      Active team
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-warning/10 text-warning">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Top Contributors
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockUsers.filter(u => u.points > 500).length}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs text-muted-foreground">
                      High engagement
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-success/10 text-success">
                  <Crown className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-accent" />
              <span>Filter Users</span>
            </CardTitle>
            <CardDescription>
              Search and filter system users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div className="w-full md:w-48">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="default">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {mockUsers.length} users
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contribution Points</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const RoleIcon = getRoleIcon(user.role);
                    const tier = getTierFromPoints(user.points);
                    
                    return (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-medium text-primary-foreground">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {user.name}
                              </p>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span>{user.email}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.role === 'citizen' ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{user.points} pts</span>
                              </div>
                              <Progress value={(user.points / 1000) * 100} className="h-2" />
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.role === 'citizen' ? (
                            <Badge variant="outline" className={tier.color}>
                              {tier.name}
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">Staff</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">
                              {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              View Profile
                            </Button>
                            {user.role !== 'admin' && (
                              <Button variant="outline" size="sm">
                                Edit Role
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;