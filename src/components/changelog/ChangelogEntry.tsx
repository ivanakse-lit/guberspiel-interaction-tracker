
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Edit, Bug, Trash2 } from 'lucide-react';
import { ChangelogEntry as ChangelogEntryType } from '@/types/changelog';

interface ChangelogEntryProps {
  entry: ChangelogEntryType;
}

const ChangelogEntry = ({ entry }: ChangelogEntryProps) => {
  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-500 hover:bg-red-600';
      case 'minor': return 'bg-blue-500 hover:bg-blue-600';
      case 'patch': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'added': return <Plus className="h-4 w-4 text-green-600" />;
      case 'changed': return <Edit className="h-4 w-4 text-blue-600" />;
      case 'fixed': return <Bug className="h-4 w-4 text-orange-600" />;
      case 'removed': return <Trash2 className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800">
            Version {entry.version}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={`${getVersionBadgeColor(entry.type)} text-white`}>
              {entry.type.toUpperCase()}
            </Badge>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {entry.date}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(entry.changes).map(([changeType, items]) => (
            items && items.length > 0 && (
              <div key={changeType}>
                <div className="flex items-center mb-2">
                  {getChangeIcon(changeType)}
                  <h4 className="ml-2 font-semibold text-gray-700 capitalize">
                    {changeType}
                  </h4>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-6">
                  {items.map((item, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangelogEntry;
