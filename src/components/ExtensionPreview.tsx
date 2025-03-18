
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Calendar, MessageSquare } from 'lucide-react';

const ExtensionPreview = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Winrate Calendar Assistant</h1>
          <p className="text-gray-600 mb-6">
            An AI assistant that integrates with your calendar to provide meeting insights, CRM data, and call analysis.
          </p>
          
          <h2 className="text-xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Automatic meeting detection in Google Calendar and Microsoft Outlook</li>
            <li>Personalized morning briefings with your day's schedule</li>
            <li>Meeting preparation with CRM insights and previous call analysis</li>
            <li>Conversational AI interface that learns from your interactions</li>
            <li>Seamless integration with your existing Winrate account</li>
          </ul>
          
          <Button className="gap-2">
            <Download size={16} />
            Download Extension
          </Button>
        </div>
        
        <div>
          <Tabs defaultValue="assistant" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="assistant">Assistant View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assistant">
              <Card>
                <CardHeader className="bg-blue-500 text-white">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Winrate Assistant</CardTitle>
                    <div className="flex gap-2">
                      <button className="text-sm">_</button>
                      <button className="text-sm">×</button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    <div className="bg-gray-200 p-3 rounded-lg w-4/5">
                      Good morning! I see you have 3 meetings scheduled today. Would you like a summary of your calendar?
                    </div>
                    <div className="bg-gray-200 p-3 rounded-lg w-4/5">
                      Your first meeting is with Acme Corp at 10:00 AM. Based on your previous calls, they were interested in the enterprise plan. Here are some talking points I've prepared.
                    </div>
                    <div className="bg-blue-500 text-white p-3 rounded-lg ml-auto w-4/5">
                      Can you pull up the notes from our last call with Acme Corp?
                    </div>
                    <div className="bg-gray-200 p-3 rounded-lg w-4/5">
                      Here are the notes from your last call with Acme Corp on April 15th:
                      <ul className="list-disc list-inside mt-2">
                        <li>Discussed enterprise pricing options</li>
                        <li>They had concerns about implementation timeline</li>
                        <li>Contact requested case studies from similar companies</li>
                        <li>Overall positive sentiment (85% positive)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 border-t flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask me anything..."
                      className="flex-1 p-2 border rounded-full"
                    />
                    <Button size="sm">Send</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar Integration</CardTitle>
                  <CardDescription>
                    The assistant appears when you're viewing your calendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4 p-2 bg-blue-100 rounded">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span className="font-medium">April 2023</span>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">Today</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { time: '9:00 AM', title: 'Team Standup', attendees: 5 },
                        { time: '11:00 AM', title: 'Acme Corp Product Demo', attendees: 3 },
                        { time: '2:00 PM', title: 'TechStart Strategy Call', attendees: 2 },
                      ].map((meeting, i) => (
                        <div 
                          key={i} 
                          className="p-2 border rounded bg-white flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{meeting.title}</div>
                            <div className="text-sm text-gray-500">{meeting.time} • {meeting.attendees} attendees</div>
                          </div>
                          <Button size="sm" variant="outline">
                            <MessageSquare size={14} className="mr-1" />
                            Insights
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="fixed bottom-20 right-5 w-64 bg-white shadow-lg rounded-lg p-3 text-sm border">
                      <div className="font-medium">Winrate Assistant</div>
                      <p className="text-gray-600 text-xs my-1">
                        Your next meeting with Acme Corp is in 30 minutes. I've prepared some insights.
                      </p>
                      <Button variant="link" size="sm" className="px-0 h-auto text-xs">
                        View details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ExtensionPreview;
