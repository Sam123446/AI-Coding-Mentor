package com.samarth.codingmentor.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${GEMINI_API_KEY:dummy}")
    private String apiKey;

    @Value("${GROQ_API_KEY:dummy}")
    private String groqApiKey;


    private String askGemini(String prompt) {

        String[] models = {
                "gemini-2.5-flash",
                "gemini-2.0-flash"
        };

        for (String model : models) {

            for (int attempt = 1; attempt <= 2; attempt++) {

                try {

                    String url =
                            "https://generativelanguage.googleapis.com/v1beta/models/"
                                    + model
                                    + ":generateContent?key="
                                    + apiKey;

                    RestTemplate restTemplate =
                            new RestTemplate();

                    Map<String, Object> requestBody =
                            Map.of(
                                    "contents",
                                    List.of(
                                            Map.of(
                                                    "parts",
                                                    List.of(
                                                            Map.of(
                                                                    "text",
                                                                    prompt
                                                            )
                                                    )
                                            )
                                    )
                            );

                    HttpHeaders headers =
                            new HttpHeaders();

                    headers.setContentType(
                            MediaType.APPLICATION_JSON
                    );

                    HttpEntity<Map<String, Object>> request =
                            new HttpEntity<>(
                                    requestBody,
                                    headers
                            );

                    ResponseEntity<String> response =
                            restTemplate.exchange(
                                    url,
                                    HttpMethod.POST,
                                    request,
                                    String.class
                            );

                    ObjectMapper mapper =
                            new ObjectMapper();

                    JsonNode root =
                            mapper.readTree(
                                    response.getBody()
                            );

                    return root
                            .path("candidates")
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

                } catch (Exception ignored) {

                }
            }
        }

        System.out.println(
                "Gemini failed. Switching to Groq..."
        );

        return askGroq(prompt);
    }private String askGroq(String prompt) {

        try {

            String url =
                    "https://api.groq.com/openai/v1/chat/completions";

            RestTemplate restTemplate =
                    new RestTemplate();

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            headers.setBearerAuth(
                    groqApiKey
            );

            Map<String, Object> requestBody =
                    Map.of(
                            "model",
                            "llama-3.3-70b-versatile",
                            "messages",
                            List.of(
                                    Map.of(
                                            "role",
                                            "user",
                                            "content",
                                            prompt
                                    )
                            )
                    );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(
                            requestBody,
                            headers
                    );

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            String.class
                    );

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(
                            response.getBody()
                    );

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {

            System.out.println(
                    "Groq also failed"
            );

            return "AI Service Unavailable";
        }
    }

    public String generateGuidance(String problem) {

        String[] models = {
                "gemini-2.5-flash",
                "gemini-2.0-flash"
        };

        for (String model : models) {

            for (int attempt = 1; attempt <= 2; attempt++) {

                try {

                    System.out.println(
                            "Trying model: "
                                    + model
                                    + " Attempt: "
                                    + attempt
                    );

                    String url =
                            "https://generativelanguage.googleapis.com/v1beta/models/"
                                    + model
                                    + ":generateContent?key="
                                    + apiKey;

                    RestTemplate restTemplate =
                            new RestTemplate();

                    String prompt = """
        You are a friendly coding mentor.

        Analyze this coding problem:

        %s

        Give the answer in this format:

        🎯 Approach
        • Explain the approach step by step

        💡 Hint
        • Give useful hints

        📈 Complexity
        • Time: O(...)
        • Space: O(...)

        ⚠️ Edge Cases
        • Mention important edge cases

        💻 Java Solution

        ```java
        // Complete working code
        ```

        Rules:
        - Keep explanations short and beginner friendly.
        - Provide a complete Java solution.
        - Use proper formatting.
        - Return only the answer in the above format.
        """
                            .formatted(problem);

                    Map<String, Object> requestBody =
                            Map.of(
                                    "contents",
                                    List.of(
                                            Map.of(
                                                    "parts",
                                                    List.of(
                                                            Map.of(
                                                                    "text",
                                                                    prompt
                                                            )
                                                    )
                                            )
                                    )
                            );

                    HttpHeaders headers =
                            new HttpHeaders();

                    headers.setContentType(
                            MediaType.APPLICATION_JSON
                    );

                    HttpEntity<Map<String, Object>> request =
                            new HttpEntity<>(
                                    requestBody,
                                    headers
                            );

                    ResponseEntity<String> response =
                            restTemplate.exchange(
                                    url,
                                    HttpMethod.POST,
                                    request,
                                    String.class
                            );

                    ObjectMapper mapper =
                            new ObjectMapper();

                    JsonNode root =
                            mapper.readTree(
                                    response.getBody()
                            );

                    return root
                            .path("candidates")
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

                } catch (Exception e) {

                    System.out.println(
                            "Failed Model: "
                                    + model
                    );

                    e.printStackTrace();

                    try {
                        Thread.sleep(2000);
                    }
                    catch (InterruptedException ignored) {

                    }
                }
            }
        }

        return """
                🤖 AI Service Busy

                Please try again after a few seconds.
                """;
    }

    public String reviewCode(
            String language,
            String code) {

        String prompt = """
You are a coding mentor.

Review the following %s code.

Respond ONLY in this format:

✅ What's Good
- point 1
- point 2

⚠️ Can Be Improved
- point 1
- point 2

📈 Complexity
- Time: O(...)
- Space: O(...)

Keep answers short.
Maximum 2 points per section.
No long explanations.

Code:

%s
"""
                .formatted(language, code);

        return askGemini(prompt);
    }
    public String generateCorrectCode(
            String language,
            String code) {

        String prompt = """
You are an expert %s programmer.

Fix all errors in the following code.

Return ONLY the corrected code.

Rules:
- No explanations.
- No comments.
- No markdown.
- No code fences.
- Output only the final corrected code.

Code:

%s
""".formatted(language, code);

        return askGemini(prompt);
    }

    public String visualizeProblem(String problem) {

        String prompt = """
        You are an expert coding tutor and a general-purpose
        algorithm visualization engine.

        Analyze the exact problem submitted by the user.

        USER PROBLEM:
        %s

        Return ONLY valid JSON. Do not include Markdown,
        explanations outside the JSON, or code fences.

        Return this structure:

        {
          "problemType": "Detected problem category",
          "title": "Short descriptive title",
          "summary": "What the problem asks",
          "diagram": {
            "type": "array",
            "nodes": [
              {
                "id": "n1",
                "label": "Element label",
                "detail": "Element value or explanation"
              }
            ],
            "connections": [
              {
                "from": "n1",
                "to": "n2",
                "label": "Relationship"
              }
            ]
          },
          "steps": [
            {
              "number": 1,
              "title": "Step title",
              "explanation": "What happens in this step",
              "state": [
                {
                  "id": "n1",
                  "label": "Element",
                  "value": "Actual value",
                  "status": "active"
                }
              ]
            }
          ],
          "keyObservation": "Important conclusion"
        }

        RULES:

        1. Support arbitrary coding problems, including arrays,
           strings, searching, sorting, linked lists, trees,
           graphs, recursion, dynamic programming, SQL,
           object-oriented programming, and other concepts.

        2. Determine the appropriate diagram type from the actual
           problem. Never assume that every problem is an array.

        3. Use actual input values when provided. If the problem
           has no sample input, create a small illustrative example
           and explicitly label it as illustrative.

        4. Generate meaningful, ordered steps for the example.
           Include relevant comparisons, decisions, state changes,
           intermediate results, and final output.

        5. Keep values and states consistent across steps.
           Never invent a result that contradicts the problem.

        6. Use diagram types such as:
           array, linkedList, stack, queue, tree, graph,
           flowchart, table, recursion, dpTable, sequence,
           or generic.

        7. For SQL, visualize tables, rows, filtering, joins,
           grouping, or query results when relevant.

        8. For recursion, show calls and returns where relevant.
           For dynamic programming, show states and transitions.
           For graphs, show vertices and edges.
           For conceptual questions, show relationships or
           a flowchart rather than an unrelated dry run.

        9. Every connection must reference existing node IDs.
           Use unique IDs for nodes.

        10. Every step's state must describe the values at that
            stage. Use status values such as active, compared,
            completed, result, or normal.

        11. Include the final answer or result when applicable.
            If the problem lacks enough information to determine
            a unique result, state the limitation in the summary.

        12. Keep explanations beginner-friendly.

        13. Ensure the output is valid JSON. Escape quotation
            marks and special characters correctly.

        14. Do not add properties outside the specified structure.
        """.formatted(problem);

        String response = askGemini(prompt);

        // Preserve a readable response if the AI provider is unavailable.
        if (response == null
                || response.isBlank()
                || response.equalsIgnoreCase("AI Service Unavailable")) {
            return """
            {
              "problemType": "Unavailable",
              "title": "Visualization unavailable",
              "summary": "The AI service could not generate a visualization. Please try again.",
              "diagram": {
                "type": "generic",
                "nodes": [],
                "connections": []
              },
              "steps": [],
              "keyObservation": "Try again when the AI service is available."
            }
            """;
        }

        return response.trim();
    }

    public String generateInterviewQuestion(
            String topic) {

        String prompt = """
    You are a senior technical interviewer.

    Generate 5 UNIQUE interview questions on:

    %s

    Rules:
    - Suitable for freshers and placement preparation.
    - Mix theory and coding questions.
    - Questions should not repeat.
    - Cover different concepts.
    - Number every question.

    Return ONLY in this format:

    1. Question one

    2. Question two

    3. Question three

    4. Question four

    5. Question five

   
    """
                .formatted(topic);

        return askGemini(prompt);
    }
    public String evaluateInterviewAnswer(
            String question,
            String answer) {

        String prompt = """
            You are a technical interviewer.

            Question:
            %s

            Candidate Answer:
            %s

            Evaluate the answer.

            Rules:
            - Keep response concise
            - Use bullet points
            - No emojis
            - No long paragraphs

            Format:

            Score: X/10

            Correct:
            • point
            • point

            Missing:
            • point
            • point

            Ideal Answer:
            • point
            • point
            """
                .formatted(
                        question,
                        answer
                );

        return askGemini(prompt);
    }
    public String predictOutput(
            String language,
            String code) {

        String prompt = """
            You are a compiler and programming expert.

            Analyze this %s code.

            Rules:
            - Predict the output.
            - If there is a compilation error,
              show the error.
            - If there is a runtime error,
              show the error.
            - If there is a logical mistake,
              explain briefly.
            - Return only the result.

            Code:

            %s
            """
                .formatted(
                        language,
                        code
                );

        return askGemini(prompt);
    }
}