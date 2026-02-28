package com.example.cooking.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cooking.common.ApiResponse;
import com.example.cooking.common.PageDTO;
import com.example.cooking.dto.RecipeIngredientSearchResponse;
import com.example.cooking.dto.response.RecipeSummaryDTO;
import com.example.cooking.security.MyUserDetails;
import com.example.cooking.service.SearchService;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@RestController
@RequestMapping("/user/test/recipes")
public class SearchController {
    // private final RecipeRepository recipeRepository;
    private final SearchService searchService;
    //  private final MeiliRecipeService meiliService;


    // @PageableDefault(page = 0, size = 20) Pageable pageable)
        @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageDTO<RecipeSummaryDTO>>> searchByKeyword(
            @AuthenticationPrincipal MyUserDetails currentUser,
            @RequestParam ("keyword") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
                Pageable pageable = PageRequest.of(page, size);
            PageDTO<RecipeSummaryDTO> recipes = searchService.searchByKeyWord(keyword, pageable, currentUser);
            return ApiResponse.ok(recipes);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/search-by-ingredients")
    public ResponseEntity<ApiResponse<PageDTO<RecipeIngredientSearchResponse>>> searchByIngredients(
            @RequestParam List<Long> ingredientIds,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.ok(searchService.searchByIngredients(ingredientIds, page, size));
    }
    

// @GetMapping("/recipes/search")
// public List<Map<String, Object>> searchRecipes(@RequestParam("q") String query) {
//     SearchResult result = meiliService.searchRecipes(query);
//     if (result != null) {
//         // getHits() trả về List<Map<String,Object>> của các document matching
//         return (List<Map<String, Object>>)(List<?>) result.getHits();
//     }
//     return List.of(); // trả về list rỗng nếu không có kết quả
// }
}