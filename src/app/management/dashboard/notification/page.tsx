"use client";

export default function Notification() {
  const notifications = [
    {
      id: 1,
      title: "Project Invitation",
      description: "You have been invited to join the E-commerce Platform project.",
      time: "2 hours ago",
      status: "Pending",
    },
    {
      id: 2,
      title: "Meeting Scheduled",
      description: "Team meeting scheduled for UI/UX Design Discussion.",
      time: "Yesterday",
      status: "Accepted",
    },
    {
      id: 3,
      title: "Task Assigned",
      description: "A new task has been assigned: Implement Product Filter Sidebar.",
      time: "3 days ago",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Invitation Declined",
      description: "You declined the invitation to the Landing Page project.",
      time: "1 week ago",
      status: "Declined",
    },
    {
      id: 5,
      title: "New Collaboration Request",
      description: "Marketing team requested collaboration on campaign analytics.",
      time: "2 weeks ago",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 ">
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <h1 className="text-black text-2xl mb-5">
        Notifications
      </h1>

      {/* Notification List */}
      <div className="grid gap-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex justify-between items-center hover:shadow-md transition-all"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {notif.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{notif.description}</p>
              <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
            </div>

            <div
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                notif.status === "Pending"
                  ? "bg-orange-100 text-orange-700"
                  : notif.status === "Accepted"
                  ? "bg-green-100 text-green-700"
                  : notif.status === "In Progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {notif.status}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
