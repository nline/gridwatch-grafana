package v0alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// Feature represents a feature in development and information about that feature
// It does *not* know the status, only defines properties about the feature itself
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type Feature struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec FeatureSpec `json:"spec,omitempty"`
}

type FeatureSpec struct {
	// The feature description
	Description string `json:"description"`

	// Indicates the features level of stability
	Stage string `json:"stage"`

	// The team who owns this feature development
	Owner string `json:"codeowner,omitempty"`

	// Enabled by default for version >=
	EnabledVersion string `json:"enabledVersion,omitempty"`

	// Must be run using in development mode (early dev)
	RequiresDevMode bool `json:"requiresDevMode,omitempty"`

	// The flab behavior only effects frontend -- it is not used in the backend
	FrontendOnly bool `json:"frontend,omitempty"`

	// The flag is used at startup, so any change requires a restart
	RequiresRestart bool `json:"requiresRestart,omitempty"`

	// Allow cloud users to set the values in UI
	AllowSelfServe bool `json:"allowSelfServe,omitempty"`

	// Do not show the value in the UI
	HideFromAdminPage bool `json:"hideFromAdminPage,omitempty"`

	// Do not show the value in docs
	HideFromDocs bool `json:"hideFromDocs,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type FeatureList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Feature `json:"items,omitempty"`
}

// FeatureToggles define the feature state
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type FeatureToggles struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	// The configured toggles.  Note this may include unknown fields
	Spec map[string]bool `json:"spec"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type FeatureTogglesList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []FeatureToggles `json:"items,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type ResolvedToggleState struct {
	metav1.TypeMeta `json:",inline"`

	// Can any flag be updated
	Writeable bool `json:"writeable"`

	// The currently enabled flags
	Enabled map[string]bool `json:"enabled,omitempty"`

	// Details on the current status
	Toggles []ToggleStatus `json:"toggles"`
}

type ToggleStatus struct {
	// The feature toggle name
	Name string `json:"name"`

	// The flag description
	Description string `json:"description,omitempty"`

	// Is the flag enabled
	Enabled bool `json:"enabled"`

	// Can this flag be updated
	Writeable bool `json:"writeable,omitempty"`

	// Where was the value configured
	// eg: default | startup | tenant|org | user | browser
	Source string `json:"source,omitempty"`

	// eg: unknown flag
	Warning string `json:"warning,omitempty"`
}
