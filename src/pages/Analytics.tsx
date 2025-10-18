import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { mockAnalytics } from '@/lib/mockData';
import { TrendingUp, Clock, Target, Users } from 'lucide-react';

const Analytics = () => {
  const { categoryStats, monthlyTrends, departmentPerformance } = mockAnalytics;

  return (
    <div className="flex-1 space-y-6">
      <Header 
        title="Analytics & Reports" 
        subtitle="Insights and performance metrics for issue resolution"
      />

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Resolution Rate
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    73.2%
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs font-medium text-success">
                      +5.4%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-success-light text-success">
                  <Target className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Response Time
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    2.5 days
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs font-medium text-success">
                      -0.3 days
                    </span>
                    <span className="text-xs text-muted-foreground">
                      improved
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-warning-light text-warning">
                  <Clock className="w-6 h-6" />
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
                    1,247
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs font-medium text-success">
                      +18%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      new users
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-accent-light text-accent">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Monthly Growth
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    +12.4%
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs font-medium text-success">
                      +2.1%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Issue Categories Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Distribution by Category</CardTitle>
              <CardDescription>
                Breakdown of reported issues across different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trends Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Issue Trends</CardTitle>
              <CardDescription>
                Issues reported vs resolved over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="reported" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Reported"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    name="Resolved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Average resolution time and issue count by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar 
                  yAxisId="left" 
                  dataKey="issues" 
                  fill="hsl(var(--primary))" 
                  name="Total Issues"
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="avgTime" 
                  fill="hsl(var(--warning))" 
                  name="Avg Time (days)"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>
              Key performance indicators and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Top Performing Departments</h4>
                <div className="space-y-3">
                  {departmentPerformance
                    .sort((a, b) => a.avgTime - b.avgTime)
                    .slice(0, 3)
                    .map((dept, index) => (
                      <div key={dept.dept} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium">{dept.dept}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {dept.avgTime} days avg
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Issue Volume Leaders</h4>
                <div className="space-y-3">
                  {departmentPerformance
                    .sort((a, b) => b.issues - a.issues)
                    .slice(0, 3)
                    .map((dept, index) => (
                      <div key={dept.dept} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium">{dept.dept}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {dept.issues} issues
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Key Insights</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-success-light rounded-lg">
                    <p className="text-sm font-medium text-success">Resolution Improvement</p>
                    <p className="text-xs text-success/80">
                      Overall resolution time decreased by 15% this quarter
                    </p>
                  </div>
                  <div className="p-3 bg-accent-light rounded-lg">
                    <p className="text-sm font-medium text-accent">Citizen Engagement</p>
                    <p className="text-xs text-accent/80">
                      Active user participation up 28% month-over-month
                    </p>
                  </div>
                  <div className="p-3 bg-warning-light rounded-lg">
                    <p className="text-sm font-medium text-warning">Priority Focus</p>
                    <p className="text-xs text-warning/80">
                      Road infrastructure issues require attention
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;