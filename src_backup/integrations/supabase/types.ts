export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_ab_tests: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          test_ended_at: string | null
          test_started_at: string | null
          variant_a_clicks: number | null
          variant_a_title: string
          variant_a_views: number | null
          variant_b_clicks: number | null
          variant_b_title: string
          variant_b_views: number | null
          winner: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          test_ended_at?: string | null
          test_started_at?: string | null
          variant_a_clicks?: number | null
          variant_a_title: string
          variant_a_views?: number | null
          variant_b_clicks?: number | null
          variant_b_title: string
          variant_b_views?: number | null
          winner?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          test_ended_at?: string | null
          test_started_at?: string | null
          variant_a_clicks?: number | null
          variant_a_title?: string
          variant_a_views?: number | null
          variant_b_clicks?: number | null
          variant_b_title?: string
          variant_b_views?: number | null
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_ab_tests_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_enhancements: {
        Row: {
          created_at: string | null
          details: Json
          enhancement_type: string
          id: string
          post_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          details?: Json
          enhancement_type: string
          id?: string
          post_id: string
          status?: string
        }
        Update: {
          created_at?: string | null
          details?: Json
          enhancement_type?: string
          id?: string
          post_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_enhancements_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_generation_errors: {
        Row: {
          created_at: string | null
          error_details: Json | null
          error_message: string
          error_type: string
          id: string
          post_id: string | null
          resolved: boolean | null
        }
        Insert: {
          created_at?: string | null
          error_details?: Json | null
          error_message: string
          error_type: string
          id?: string
          post_id?: string | null
          resolved?: boolean | null
        }
        Update: {
          created_at?: string | null
          error_details?: Json | null
          error_message?: string
          error_type?: string
          id?: string
          post_id?: string | null
          resolved?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_generation_errors_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_generation_history: {
        Row: {
          category: string
          generated_at: string | null
          id: string
          keywords: string[]
          post_id: string | null
          topic: string
        }
        Insert: {
          category: string
          generated_at?: string | null
          id?: string
          keywords: string[]
          post_id?: string | null
          topic: string
        }
        Update: {
          category?: string
          generated_at?: string | null
          id?: string
          keywords?: string[]
          post_id?: string | null
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_generation_history_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_revisions: {
        Row: {
          change_summary: string | null
          changed_by: string
          content_html: string
          created_at: string | null
          id: string
          keywords: string[]
          meta_description: string
          meta_title: string
          post_id: string
          revision_number: number
          title: string
        }
        Insert: {
          change_summary?: string | null
          changed_by?: string
          content_html: string
          created_at?: string | null
          id?: string
          keywords?: string[]
          meta_description: string
          meta_title: string
          post_id: string
          revision_number: number
          title: string
        }
        Update: {
          change_summary?: string | null
          changed_by?: string
          content_html?: string
          created_at?: string | null
          id?: string
          keywords?: string[]
          meta_description?: string
          meta_title?: string
          post_id?: string
          revision_number?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_tags: {
        Row: {
          created_at: string | null
          post_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          post_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          ab_test_active: boolean | null
          author: string | null
          category: string
          content_html: string
          created_at: string | null
          enhancement_version: number | null
          excerpt: string
          featured_image: string | null
          id: string
          images_count: number | null
          internal_links_count: number | null
          keywords: string[]
          last_enhanced_at: string | null
          last_refreshed_at: string | null
          meta_description: string
          meta_title: string
          needs_refresh: boolean | null
          outbound_links_count: number | null
          publish_date: string
          readability_score: number | null
          slug: string
          sources: Json | null
          status: string | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          ab_test_active?: boolean | null
          author?: string | null
          category: string
          content_html: string
          created_at?: string | null
          enhancement_version?: number | null
          excerpt: string
          featured_image?: string | null
          id?: string
          images_count?: number | null
          internal_links_count?: number | null
          keywords?: string[]
          last_enhanced_at?: string | null
          last_refreshed_at?: string | null
          meta_description: string
          meta_title: string
          needs_refresh?: boolean | null
          outbound_links_count?: number | null
          publish_date?: string
          readability_score?: number | null
          slug: string
          sources?: Json | null
          status?: string | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          ab_test_active?: boolean | null
          author?: string | null
          category?: string
          content_html?: string
          created_at?: string | null
          enhancement_version?: number | null
          excerpt?: string
          featured_image?: string | null
          id?: string
          images_count?: number | null
          internal_links_count?: number | null
          keywords?: string[]
          last_enhanced_at?: string | null
          last_refreshed_at?: string | null
          meta_description?: string
          meta_title?: string
          needs_refresh?: boolean | null
          outbound_links_count?: number | null
          publish_date?: string
          readability_score?: number | null
          slug?: string
          sources?: Json | null
          status?: string | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      blog_tags: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_next_post_for_refresh: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_post_views: { Args: { post_id: string }; Returns: number }
      mark_posts_for_refresh: { Args: never; Returns: undefined }
      promote_user_to_admin: {
        Args: { user_email: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
