import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api.js";

const FriendsPage = () => {
  const { data: friends = [], isLoading, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) return <p>Loading friends...</p>;
  if (isError) return <p>Failed to load friends</p>;

  // 🔥 Remove null values safely
  const validFriends = friends.filter((friend) => friend?._id);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Friends</h2>

      {validFriends.length === 0 && (
        <p className="text-gray-500">No friends yet</p>
      )}

      <div className="space-y-4">
        {validFriends.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center gap-4 p-3 rounded-lg border"
          >
            <img
              src={friend.profilePic || "/avatar.png"}
              alt={friend.fullName}
              className="w-12 h-12 rounded-full"
              referrerPolicy="no-referrer"
            />

            <div>
              <p className="font-medium">{friend.fullName}</p>

              <p className="text-sm text-gray-500">
                Native: {friend.nativeLanguage}
              </p>
              <p className="text-sm text-gray-500">
                Learning: {friend.learningLanguage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default FriendsPage;
