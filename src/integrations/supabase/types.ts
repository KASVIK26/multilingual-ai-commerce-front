export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          added_at: string | null
          color: string | null
          custom_options: Json | null
          id: string
          notes: string | null
          price_at_addition: number
          product_id: string
          quantity: number
          size: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          added_at?: string | null
          color?: string | null
          custom_options?: Json | null
          id?: string
          notes?: string | null
          price_at_addition: number
          product_id: string
          quantity?: number
          size?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          added_at?: string | null
          color?: string | null
          custom_options?: Json | null
          id?: string
          notes?: string | null
          price_at_addition?: number
          product_id?: string
          quantity?: number
          size?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          chat_type: string | null
          context: Json | null
          created_at: string | null
          id: string
          language: string | null
          last_message_at: string | null
          message_count: number | null
          metadata: Json | null
          status: string | null
          summary: string | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chat_type?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          last_message_at?: string | null
          message_count?: number | null
          metadata?: Json | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chat_type?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          last_message_at?: string | null
          message_count?: number | null
          metadata?: Json | null
          status?: string | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          chat_id: string
          content: string
          created_at: string | null
          edited_at: string | null
          id: string
          is_edited: boolean | null
          message_type: string | null
          metadata: Json | null
          model_used: string | null
          parent_message_id: string | null
          processing_time_ms: number | null
          role: string
          tokens_used: number | null
        }
        Insert: {
          attachments?: Json | null
          chat_id: string
          content: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_edited?: boolean | null
          message_type?: string | null
          metadata?: Json | null
          model_used?: string | null
          parent_message_id?: string | null
          processing_time_ms?: number | null
          role: string
          tokens_used?: number | null
        }
        Update: {
          attachments?: Json | null
          chat_id?: string
          content?: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_edited?: boolean | null
          message_type?: string | null
          metadata?: Json | null
          model_used?: string | null
          parent_message_id?: string | null
          processing_time_ms?: number | null
          role?: string
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          data: Json | null
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          priority: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          priority?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          priority?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          color: string | null
          created_at: string | null
          custom_options: Json | null
          id: string
          order_id: string
          product_description: string | null
          product_id: string | null
          product_image_url: string | null
          product_name: string
          product_url: string | null
          quantity: number
          size: string | null
          sku: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          custom_options?: Json | null
          id?: string
          order_id: string
          product_description?: string | null
          product_id?: string | null
          product_image_url?: string | null
          product_name: string
          product_url?: string | null
          quantity: number
          size?: string | null
          sku?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          color?: string | null
          created_at?: string | null
          custom_options?: Json | null
          id?: string
          order_id?: string
          product_description?: string | null
          product_id?: string | null
          product_image_url?: string | null
          product_name?: string
          product_url?: string | null
          quantity?: number
          size?: string | null
          sku?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery: string | null
          billing_address: Json
          cancellation_reason: string | null
          cancelled_at: string | null
          confirmed_at: string | null
          created_at: string | null
          currency: string | null
          discount_amount: number | null
          estimated_delivery: string | null
          id: string
          internal_notes: string | null
          order_date: string | null
          order_notes: string | null
          order_number: string
          payment_details: Json | null
          payment_method: string | null
          payment_status: string | null
          shipped_at: string | null
          shipping_address: Json
          shipping_amount: number | null
          shipping_carrier: string | null
          status: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_delivery?: string | null
          billing_address: Json
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          estimated_delivery?: string | null
          id?: string
          internal_notes?: string | null
          order_date?: string | null
          order_notes?: string | null
          order_number: string
          payment_details?: Json | null
          payment_method?: string | null
          payment_status?: string | null
          shipped_at?: string | null
          shipping_address: Json
          shipping_amount?: number | null
          shipping_carrier?: string | null
          status?: string | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_delivery?: string | null
          billing_address?: Json
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          estimated_delivery?: string | null
          id?: string
          internal_notes?: string | null
          order_date?: string | null
          order_notes?: string | null
          order_number?: string
          payment_details?: Json | null
          payment_method?: string | null
          payment_status?: string | null
          shipped_at?: string | null
          shipping_address?: Json
          shipping_amount?: number | null
          shipping_carrier?: string | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_interactions: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          interaction_duration: number | null
          interaction_type: string
          product_id: string
          source: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          interaction_duration?: number | null
          interaction_type: string
          product_id: string
          source?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          interaction_duration?: number | null
          interaction_type?: string
          product_id?: string
          source?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_interactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          affiliate_url: string | null
          availability_status: string | null
          brand: string | null
          category: string | null
          color: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          dimensions: Json | null
          discount_percentage: number | null
          features: string[] | null
          id: string
          image_url: string | null
          images: string[] | null
          is_active: boolean | null
          material: string | null
          model: string | null
          name: string
          original_price: number | null
          platform: string | null
          platform_specific_data: Json | null
          price: number
          product_id: string
          product_url: string | null
          rating: number | null
          region: string | null
          return_policy: string | null
          review_count: number | null
          scraped_at: string | null
          search_vector: unknown | null
          seller_name: string | null
          seller_rating: number | null
          shipping_info: Json | null
          short_description: string | null
          size: string | null
          sku: string | null
          specifications: Json | null
          stock_quantity: number | null
          subcategory: string | null
          tags: string[] | null
          updated_at: string | null
          warranty_info: string | null
        }
        Insert: {
          affiliate_url?: string | null
          availability_status?: string | null
          brand?: string | null
          category?: string | null
          color?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          dimensions?: Json | null
          discount_percentage?: number | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_active?: boolean | null
          material?: string | null
          model?: string | null
          name: string
          original_price?: number | null
          platform?: string | null
          platform_specific_data?: Json | null
          price: number
          product_id: string
          product_url?: string | null
          rating?: number | null
          region?: string | null
          return_policy?: string | null
          review_count?: number | null
          scraped_at?: string | null
          search_vector?: unknown | null
          seller_name?: string | null
          seller_rating?: number | null
          shipping_info?: Json | null
          short_description?: string | null
          size?: string | null
          sku?: string | null
          specifications?: Json | null
          stock_quantity?: number | null
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string | null
          warranty_info?: string | null
        }
        Update: {
          affiliate_url?: string | null
          availability_status?: string | null
          brand?: string | null
          category?: string | null
          color?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          dimensions?: Json | null
          discount_percentage?: number | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_active?: boolean | null
          material?: string | null
          model?: string | null
          name?: string
          original_price?: number | null
          platform?: string | null
          platform_specific_data?: Json | null
          price?: number
          product_id?: string
          product_url?: string | null
          rating?: number | null
          region?: string | null
          return_policy?: string | null
          review_count?: number | null
          scraped_at?: string | null
          search_vector?: unknown | null
          seller_name?: string | null
          seller_rating?: number | null
          shipping_info?: Json | null
          short_description?: string | null
          size?: string | null
          sku?: string | null
          specifications?: Json | null
          stock_quantity?: number | null
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string | null
          warranty_info?: string | null
        }
        Relationships: []
      }
      reorder_suggestions: {
        Row: {
          created_at: string | null
          id: string
          last_ordered_at: string | null
          next_suggested_date: string | null
          order_frequency: number | null
          priority_score: number | null
          product_id: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_ordered_at?: string | null
          next_suggested_date?: string | null
          order_frequency?: number | null
          priority_score?: number | null
          product_id: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_ordered_at?: string | null
          next_suggested_date?: string | null
          order_frequency?: number | null
          priority_score?: number | null
          product_id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reorder_suggestions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reorder_suggestions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_queries: {
        Row: {
          chat_id: string | null
          created_at: string | null
          extracted_features: Json | null
          id: string
          message_id: string | null
          original_query: string
          processed_query: string | null
          query_language: string | null
          results_count: number | null
          search_duration_ms: number | null
          search_filters: Json | null
          search_intent: string | null
          user_id: string
        }
        Insert: {
          chat_id?: string | null
          created_at?: string | null
          extracted_features?: Json | null
          id?: string
          message_id?: string | null
          original_query: string
          processed_query?: string | null
          query_language?: string | null
          results_count?: number | null
          search_duration_ms?: number | null
          search_filters?: Json | null
          search_intent?: string | null
          user_id: string
        }
        Update: {
          chat_id?: string | null
          created_at?: string | null
          extracted_features?: Json | null
          id?: string
          message_id?: string | null
          original_query?: string
          processed_query?: string | null
          query_language?: string | null
          results_count?: number | null
          search_duration_ms?: number | null
          search_filters?: Json | null
          search_intent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_queries_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_queries_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_queries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_results: {
        Row: {
          created_at: string | null
          id: string
          match_reasons: string[] | null
          position_in_results: number | null
          product_id: string
          relevance_score: number | null
          search_query_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_reasons?: string[] | null
          position_in_results?: number | null
          product_id: string
          relevance_score?: number | null
          search_query_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          match_reasons?: string[] | null
          position_in_results?: number | null
          product_id?: string
          relevance_score?: number | null
          search_query_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_results_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_results_search_query_id_fkey"
            columns: ["search_query_id"]
            isOneToOne: false
            referencedRelation: "search_queries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          display_preferences: Json | null
          excluded_brands: string[] | null
          excluded_categories: string[] | null
          id: string
          notification_preferences: Json | null
          preferred_brands: string[] | null
          preferred_categories: string[] | null
          preferred_colors: string[] | null
          preferred_platforms: string[] | null
          preferred_regions: string[] | null
          preferred_sizes: string[] | null
          price_range_max: number | null
          price_range_min: number | null
          search_preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_preferences?: Json | null
          excluded_brands?: string[] | null
          excluded_categories?: string[] | null
          id?: string
          notification_preferences?: Json | null
          preferred_brands?: string[] | null
          preferred_categories?: string[] | null
          preferred_colors?: string[] | null
          preferred_platforms?: string[] | null
          preferred_regions?: string[] | null
          preferred_sizes?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          search_preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_preferences?: Json | null
          excluded_brands?: string[] | null
          excluded_categories?: string[] | null
          id?: string
          notification_preferences?: Json | null
          preferred_brands?: string[] | null
          preferred_categories?: string[] | null
          preferred_colors?: string[] | null
          preferred_platforms?: string[] | null
          preferred_regions?: string[] | null
          preferred_sizes?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          search_preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string | null
          gender: string | null
          id: string
          is_premium: boolean | null
          language_preference: string | null
          last_name: string | null
          notification_preferences: Json | null
          phone: string | null
          preferences: Json | null
          subscription_ends_at: string | null
          timezone: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          gender?: string | null
          id: string
          is_premium?: boolean | null
          language_preference?: string | null
          last_name?: string | null
          notification_preferences?: Json | null
          phone?: string | null
          preferences?: Json | null
          subscription_ends_at?: string | null
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          gender?: string | null
          id?: string
          is_premium?: boolean | null
          language_preference?: string | null
          last_name?: string | null
          notification_preferences?: Json | null
          phone?: string | null
          preferences?: Json | null
          subscription_ends_at?: string | null
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          added_at: string | null
          id: string
          notes: string | null
          priority: number | null
          product_id: string
          wishlist_id: string
        }
        Insert: {
          added_at?: string | null
          id?: string
          notes?: string | null
          priority?: number | null
          product_id: string
          wishlist_id: string
        }
        Update: {
          added_at?: string | null
          id?: string
          notes?: string | null
          priority?: number | null
          product_id?: string
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_default: boolean | null
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
