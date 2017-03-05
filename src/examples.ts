export default {
  // 1736210353282450 is the section ID for "all games" category
  'First 50 games': `
    Query Section_react_SectionRelayQL {
      node(1736210353282450) { @F0 }
    }

    QueryFragment F0 : AppStoreSection {
      all_items as all_total {
        count
      },
      all_items.first(50) as all_paged {
        edges {
          node { @F1 },
          cursor
        },
        page_info { has_next_page, has_previous_page }
      },
      id
    }

    QueryFragment F1 : Application {
      display_name,
      display_short_description,
      comfort_rating,
      current_offer {
        price { offset_amount, amount, currency },
        strikethrough_price { offset_amount, amount, currency }
      },
      age_rating { category_name },
      category_name,
      developer { name },
      developer_privacy_policy_url,
      developer_terms_of_service_url,
      genre_names,
      latest_supported_binary {
        required_space,
        version
      },
      publisher_name,
      recommended_graphics,
      recommended_memory_gb,
      recommended_processor,
      release_date,
      supported_in_app_languages {name},
      supported_input_devices,
      supported_player_modes,
      supported_tracking_modes,
      user_interaction_modes,
      website_url,
      id,
      quality_rating_histogram_aggregate { star_rating, count },
      internet_connection,
      cover_landscape_image.size(720x405).encode(JPEG) as cover_landscape_image { uri },
      screenshots.size(1440x810).encode(JPEG) { uri },
      video_trailer { uri, thumbnail { uri }}
    }
  `
};