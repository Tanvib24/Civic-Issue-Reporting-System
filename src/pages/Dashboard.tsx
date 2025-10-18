import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  MapPin,
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { mockAnalytics, mockUsers, mockIssues } from '@/lib/mockData';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Issues',
      value: mockAnalytics.totalIssues,
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-primary'
    },
    {
      title: 'Open Issues',
      value: mockAnalytics.openIssues,
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      title: 'Resolved Issues',
      value: mockAnalytics.resolvedIssues,
      change: '+18%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Avg Resolution Time',
      value: `${mockAnalytics.avgResolutionTime} days`,
      change: '-0.3 days',
      trend: 'down',
      icon: Clock,
      color: 'text-accent'
    }
  ];

  const topReporters = mockUsers
    .filter(user => user.role === 'citizen')
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const recentIssues = mockIssues
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  return (
    <div className="flex-1 space-y-6">
      <Header 
        title="Dashboard" 
        subtitle="Overview of civic issues and system performance"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <span className={`text-xs font-medium ${
                        stat.trend === 'up' ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Citizens Leaderboard */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-warning" />
                <span>Top Citizen Reporters</span>
              </CardTitle>
              <CardDescription>
                Citizens with the highest contribution points
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topReporters.map((citizen, index) => (
                <div key={citizen.id} className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {citizen.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Progress value={(citizen.points / 1000) * 100} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground">
                        {citizen.points} pts
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Recent Issues</span>
              </CardTitle>
              <CardDescription>
                Latest reported issues from citizens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {issue.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {issue.category} • {new Date(issue.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={issue.status === 'resolved' ? 'default' : 'secondary'}
                        className={
                          issue.status === 'resolved' 
                            ? 'bg-success text-success-foreground' 
                            : issue.status === 'in_progress' 
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }
                      >
                        {issue.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Categories</CardTitle>
            <CardDescription>
              Distribution of issues across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {mockAnalytics.categoryStats.map((category) => (
                <div key={category.name} className="text-center p-4 border border-border rounded-lg">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full mb-3 flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.value}
                  </div>
                  <p className="text-sm font-medium text-foreground">{category.name}</p>
                  <p className="text-xs text-muted-foreground">Issues</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;