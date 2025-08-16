import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router';

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onMenuPress?: () => void;            // not shown in new UI, but kept for compatibility
  onNotificationPress?: () => void;
  onFilterPress?: () => void;
  user?: {
    name?: string;
    email?: string;
    id?: string;
  } | null;
  hasUnread?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onMenuPress,
  onNotificationPress,
  onFilterPress,
  user,
  hasUnread = true,
}) => {
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const salutation = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    if (h < 21) return 'Good Evening';
    return 'Good Night';
  }, []);

 

  const displayName = user?.name ?? 'Mike';
  const avatarSrc =
    user?.avatar ??
    'https://i.pravatar.cc/80?img=13';

  return (
    <View style={styles.header}>
      {/* Top row: avatar + greeting text on left, bell on right */}
      <View style={styles.topRow}>
        <View style={styles.leftBlock}>
          <TouchableOpacity onPress={() => router.push('/(protected)/profile')} style={styles.avatarWrap}>
            <Image source={{ uri: avatarSrc }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.greetLine}>Welcome {displayName}</Text>
            <Text style={styles.salute}>{salutation}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onNotificationPress}
          activeOpacity={0.8}
          style={styles.bellWrap}
        >
          <Ionicons name="notifications-outline" size={20} color="#111827" />
          {hasUnread && <View style={styles.badgeDot} />}
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={[
          styles.searchBar,
          isSearchFocused && { borderColor: COLORS.primary, shadowOpacity: 0.12, elevation: 3 },
        ]}>
        <Ionicons name="search" size={18} color="#7C8A9A" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search places to explore..."
          placeholderTextColor="#9AA5B1"
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          autoCapitalize="words"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        <TouchableOpacity
          style={styles.filterPill}
          onPress={onFilterPress}
          activeOpacity={0.9}
        >
          <Ionicons name="options-outline" size={16} color="#111827" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;


const styles = StyleSheet.create({
  header: {
    // backgroundColor: '#F7F7F9', 
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },

  // Top row
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: "100%",
    backgroundColor: COLORS.primary, // yellow circle behind avatar
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetLine: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto-Medium',
  },
  salute: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '700',
    fontFamily: 'Roboto-Bold',
    marginTop: -2,
  },

  // Bell with red dot
  bellWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },

  // Search bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',

    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
    fontFamily: 'Roboto-Regular',
  },
  filterPill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
